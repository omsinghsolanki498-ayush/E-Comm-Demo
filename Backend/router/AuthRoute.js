const express = require("express");

const router = express.Router();

const middleware = require("../Middleware/AuthMiddleware");
const admin = require("../Middleware/AdminMiddleware");

const {
  register,
  login,
} = require("../Auth/RegisterAuth");

// ================= AUTH =================

// Register
router.post("/register", register);

// Login
router.post("/login", login);


// ================= ADMIN =================

router.get(
  "/admin",
  middleware,
  admin,
  (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Welcome Admin Dashboard",
    });
  }
);


// ================= DASHBOARD =================

router.get(
  "/dashboard",
  middleware,
  admin,
  (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Welcome Dashboard",
    });
  }
);


module.exports = router;