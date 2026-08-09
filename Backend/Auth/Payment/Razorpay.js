const express = require("express");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// create order
const ordercreate = async (req, res) => {

    try {

        const { amount } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid amount"
            });
        }
        const options = {

            amount: amount * 100,// convert into paisa
            currency: "INR",
            receipt: `receipt_${Date.now()}`,

        };

        const order = await razorpay.orders.create(options);

        res.json(order);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

module.exports = { ordercreate };