// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema(
//     {

//         user: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User",
//             required: true,
//         },

//         product: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "products",
//             required: true,
//         },

//         quantity: {
//             type: Number,
//             required: true,
//         },

//         size: {
//             type: Number,
//         },

//         paymentMethod: {
//             type: String,
//             default: "Razorpay",
//         },

//         paymentStatus: {
//             type: String,
//             default: "Pending",
//         },

//         address: {
//             type: Object,
//             required: true,
//         },

//         totalamount: {
//             type: Number,
//             required: true,
//         },

//         razorpay_order_id: {
//             type: String,
//         },

//         razorpay_payment_id: {
//             type: String,
//         },

//         razorpay_signature: {
//             type: String,
//         },

//         createdAt: {
//             type: Date,
//             default: Date.now,
//         },
//     }
// );

// module.exports =
//     mongoose.models.Order ||
//     mongoose.model("Order", orderSchema);

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    size: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      default: "Razorpay",
    },

    paymentStatus: {
      type: String,
      default: "Pending",
    },

    orderStatus: {
      type: String,
      default: "placed",
    },

    address: {
      type: Object,
      required: true,
    },

    totalamount: {
      type: Number,
      required: true,
    },

    razorpay_order_id: {
      type: String,
    },

    razorpay_payment_id: {
      type: String,
    },

    razorpay_signature: {
      type: String,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

module.exports =
  mongoose.models.Order ||
  mongoose.model("Order", orderSchema);