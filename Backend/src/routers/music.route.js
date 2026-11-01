const express = require("express");
const multer = require("multer");
const { musicGen, listMusic , createAlbum , getAllAlbum, deleteMusic} = require("../controllers/music.controller");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/create-music",

  
  upload.fields([
    { name: "music", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  musicGen
);

router.post("/create-album" ,createAlbum)
router.delete("/delete-music/:id", deleteMusic)

router.get('/list', listMusic);
router.get("/get-albums", getAllAlbum)

module.exports = router;