const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./routers/auth.route");
const musicrouter = require("./routers/music.route");

const app = express();

app.use(cors({
    origin: (origin, callback) => {
        // Vite runs on localhost; Electron packaged apps can send no Origin.
        if (!origin || origin === "http://localhost:5173" || origin === "http://127.0.0.1:5173" || origin === "file://") {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/upload", musicrouter);

app.get("/api/health", (req, res) => {
    res.status(200).json({ success: true, message: "PulseBeat backend is running" });
});

module.exports = app;