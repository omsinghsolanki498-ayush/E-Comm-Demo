// const express = require("express");
// const authmiddleware = require("../Middleware/AuthMiddleware");

// const {Order} = require("../Auth/CodPayment"); // 
// const router = express.Router();

// router.post("/cod" , authmiddleware,Order);

// module.exports = router;


const express = require("express");

const authmiddleware = require("../Middleware/AuthMiddleware");

const { Order } = require("../Auth/CodPayment");

const router = express.Router();

// =========================
// CASH ON DELIVERY
// =========================

router.post(
  "/cod",
  authmiddleware,
  Order
);

module.exports = router;