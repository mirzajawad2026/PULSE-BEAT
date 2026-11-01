const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
// -- register -- to -- user --
router.post("/register", authController.register);
router.post("/login", authController.loginUser)
router.post("/logout", authController.logout)

module.exports = router;