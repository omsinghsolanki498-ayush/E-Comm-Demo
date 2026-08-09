const express = require("express");
const router = express.Router();

const Product = require("../Model/ProductModel");
const User = require("../Model/User");
const Order = require("../Model/Order");

const { getotherproduct } = require("../Auth/otherProduct");

// ==============================
// Other Products
// ==============================

router.get("/other-products/:id", getotherproduct);


// ==============================
// Revenue Dashboard
// ==============================

router.get("/reveanue", async (req, res) => {
    try {

        // Total Products
        const totalProducts =
            await Product.countDocuments();


        // Total Users
        const totalUsers =
            await User.countDocuments();


        // Total Paid Orders
        const totalOrders =
            await Order.countDocuments({
                paymentStatus: "Paid",
            });


        // Total Revenue
        const revenue =
            await Order.aggregate([
                {
                    $match: {
                        paymentStatus: "Paid",
                    },
                },
                {
                    $group: {
                        _id: null,

                        totalRevenue: {
                            $sum: "$totalamount",
                        },
                    },
                },
            ]);


        const totalRevenue =
            revenue.length > 0
                ? revenue[0].totalRevenue
                : 0;


        // Response
        res.status(200).json({
            success: true,
            totalProducts,
            totalUsers,
            totalOrders,
            totalRevenue,
        });


    } catch (error) {

        console.log(
            "REVENUE ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Revenue fetch failed",
            error: error.message,
        });
    }
});


module.exports = router;