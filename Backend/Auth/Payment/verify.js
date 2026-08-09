const crypto = require("crypto");
const OrderModel = require("../../Model/Order");

const verifyPayment = async (req, res) => {
    try {

        console.log("================================");
        console.log("VERIFY PAYMENT START");
        console.log("================================");

        // ==============================
        // USER FROM JWT
        // ==============================

        console.log("USER FROM TOKEN:", req.user);

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        // JWT can contain _id OR id
        const userId = req.user._id || req.user.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User ID not found in token"
            });
        }


        // ==============================
        // GET REQUEST DATA
        // ==============================

        const {
            product,
            quantity,
            size,
            address,

            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;


        // ==============================
        // CHECK PRODUCT
        // ==============================

        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Product data missing"
            });
        }


        // ==============================
        // CHECK PAYMENT DATA
        // ==============================

        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature
        ) {
            return res.status(400).json({
                success: false,
                message: "Razorpay payment details missing"
            });
        }


        // ==============================
        // PRODUCT ID
        // ==============================

        const productId =
            product._id || product.id;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID missing"
            });
        }


        // ==============================
        // QUANTITY
        // ==============================

        const productQuantity =
            Number(quantity);

        if (
            !productQuantity ||
            productQuantity <= 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid quantity"
            });
        }


        // ==============================
        // TOTAL AMOUNT
        // ==============================

        const totalamount =
            Number(product.price) *
            productQuantity;

        if (
            !totalamount ||
            totalamount <= 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid total amount"
            });
        }


        // ==============================
        // RAZORPAY SIGNATURE
        // ==============================

        const body =
            razorpay_order_id +
            "|" +
            razorpay_payment_id;


        const expectedSignature =
            crypto
                .createHmac(
                    "sha256",
                    process.env.RAZORPAY_KEY_SECRET
                )
                .update(body)
                .digest("hex");


        console.log(
            "Expected Signature:",
            expectedSignature
        );

        console.log(
            "Received Signature:",
            razorpay_signature
        );


        // ==============================
        // VERIFY SIGNATURE
        // ==============================

        if (
            expectedSignature !==
            razorpay_signature
        ) {

            console.log(
                "❌ Invalid Razorpay Signature"
            );

            return res.status(400).json({
                success: false,
                message: "Invalid Razorpay Signature"
            });
        }


        console.log(
            "✅ Razorpay Signature Verified"
        );


        // ==============================
        // CREATE ORDER
        // ==============================

        const order = await OrderModel.create({

            // User
            user: userId,

            // Product
            product: productId,

            // Quantity
            quantity: productQuantity,

            // Size
            size: size,

            // Payment Method
            paymentMethod: "Razorpay",

            // Payment Status
            paymentStatus: "Paid",

            // Address
            address: address,

            // Total Amount
            totalamount: totalamount,

            // Razorpay Order ID
            razorpay_order_id:
                razorpay_order_id,

            // Razorpay Payment ID
            razorpay_payment_id:
                razorpay_payment_id,

            // Razorpay Signature
            razorpay_signature:
                razorpay_signature
        });


        // ==============================
        // SUCCESS
        // ==============================

        console.log(
            "✅ ORDER CREATED:",
            order._id
        );


        return res.status(200).json({

            success: true,

            message:
                "Payment Successful",

            order: order
        });


    } catch (error) {

        console.log(
            "❌ VERIFY PAYMENT ERROR:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                error.message
        });
    }
};


module.exports = {
    verifyPayment
};
