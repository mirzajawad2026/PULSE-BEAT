const jwt = require("jsonwebtoken");
const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const { uploadFile } = require("../services/music.service");

// ================= Upload Music =================

async function musicGen(req, res) {
    try {
        const authHeader = req.headers.authorization || "";
        const tokenFromHeader = authHeader.startsWith("Bearer ")
            ? authHeader.slice(7).trim()
            : "";

        const token =
            req.cookies?.token ||
            tokenFromHeader ||
            req.body?.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not found"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_PASSWORD);

        if (decoded.role !== "artist") {
            return res.status(403).json({
                success: false,
                message: "You can't access this route"
            });
        }

        const { title } = req.body;
        const file =
            req.file ||
            req.files?.music?.[0] ||
            req.files?.file?.[0];

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Song title is required"
            });
        }

        if (!file || !file.buffer) {
            return res.status(400).json({
                success: false,
                message: "Please upload a music file"
            });
        }

        const result = await uploadFile(file.buffer, file.originalname);

        const music = await musicModel.create({
            songName: title,
            uri: result.url,
            artist: decoded.id
        });

        return res.status(201).json({
            success: true,
            message: "Music uploaded successfully",
            music
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

// ================= Get All Music =================

async function listMusic(req, res) {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "Token not found"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_PASSWORD);

        if (decoded.role !== "user" && decoded.role !== "artist") {
            return res.status(403).json({
                message: "You don't have access"
            });
        }

        const query = req.query.mine === "true"
            ? { artist: decoded.id }
            : {};

        const musics = await musicModel
            .find(query)
            .limit(20)
            .populate("artist", "username email");

        return res.status(200).json({
            success: true,
            musics
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

// ================= Create Album =================

async function createAlbum(req, res) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Token not found"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_PASSWORD);

        if (decoded.role !== "artist") {
            return res.status(403).json({
                message: "You can't access this route"
            });
        }

        const { title, musics } = req.body;

        if (!title || !Array.isArray(musics) || musics.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide an album title and at least one song"
            });
        }

        const ownedSongs = await musicModel.find({
            _id: { $in: musics },
            artist: decoded.id
        });

        if (ownedSongs.length !== musics.length) {
            return res.status(400).json({
                success: false,
                message: "You can only create albums using your own songs"
            });
        }

        const album = await albumModel.create({
            title,
            artist: decoded.id,
            musics
        });

        return res.status(201).json({
            success: true,
            message: "Album created successfully",
            album
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

// ================= Delete Music =================

async function deleteMusic(req, res) {
    try {
        const authHeader = req.headers.authorization || "";
        const tokenFromHeader = authHeader.startsWith("Bearer ")
            ? authHeader.slice(7).trim()
            : "";

        const token = req.cookies?.token || tokenFromHeader;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not found"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_PASSWORD);

        if (decoded.role !== "artist") {
            return res.status(403).json({
                success: false,
                message: "Only artists can delete tracks"
            });
        }

        const music = await musicModel.findById(req.params.id);

        if (!music) {
            return res.status(404).json({
                success: false,
                message: "Music not found"
            });
        }

        if (music.artist.toString() !== decoded.id) {
            return res.status(403).json({
                success: false,
                message: "You can only delete your own tracks"
            });
        }

        await musicModel.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Music deleted successfully"
        });
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

// ================= Get All Albums =================

async function getAllAlbum(req, res) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Token not found"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_PASSWORD);

        if (decoded.role !== "user" && decoded.role !== "artist") {
            return res.status(403).json({
                message: "You can't access albums"
            });
        }

        const albums = await albumModel
            .find()
            .populate("artist", "username email")
            .populate({
                path: "musics",
                populate: {
                    path: "artist",
                    select: "username email"
                }
            });

        return res.status(200).json({
            success: true,
            message: "Albums fetched successfully",
            albums
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = {
    musicGen,
    listMusic,
    createAlbum,
    getAllAlbum,
    deleteMusic
};