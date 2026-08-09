const express = require("express");  // require express
const router = express.Router();
const middleware = require("../Middleware/AuthMiddleware");
const admin = require("../Middleware/AdminMiddleware");
const { register, login } = require("../Auth/RegisterAuth");

router.post("/register", register);
router.post("/login", login);

router.get("admin",middleware,admin,(req, res )=>{
    return res.status(201).json({
        success:true,
        message:"welcome dashboard"
    });
});

router.get("/dashboard", middleware  , admin, (req, res) => {
    return res.status(201).json({
        success: true,
        message: "welcome dashboard",
    });
});


module.exports = router;