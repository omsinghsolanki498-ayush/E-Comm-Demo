const express = require("express");
const router = express.Router();

const authMiddleware = require("../Middleware/AuthMiddleware");

const payment = require("../Auth/Payment/Razorpay");
const { verifyPayment } = require("../Auth/Payment/verify");

router.post("/create-order", authMiddleware, payment.ordercreate);

router.post("/verify", authMiddleware, verifyPayment);

module.exports = router;