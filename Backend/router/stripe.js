const express = require("express");
const router = express.Router();

const authmiddleware = require("../Middleware/AuthMiddleware");
const { createSession } = require("../Auth/createSession");

router.post("/create-session", authmiddleware, createSession);

module.exports = router;