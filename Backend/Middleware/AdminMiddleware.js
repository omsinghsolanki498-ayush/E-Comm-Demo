const express = require("express");

const AdminMiddleware = (req, res, next) => {

    if (req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "admin access only",
        });
    };
    next();
};

module.exports = AdminMiddleware;