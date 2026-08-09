const express = require("express");
const router = express.Router();

const { getAllusers } = require("../Auth/getAllusers");

const authmiddleware = require("../Middleware/AuthMiddleware");
const adminmiddleware = require("../Middleware/AdminMiddleware");

router.get("/users",
    authmiddleware,
    adminmiddleware,
    getAllusers);

module.exports = router;