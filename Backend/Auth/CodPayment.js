// const ordermodel = require("../Model/Order");

// const Order = async(req, res) => {
//     try{

//         const {product, quantity,size,address} = req.body;

//         const order = await ordermodel.create({
//             user : req.user.id,
//             product,
//             quantity,
//             size,
//             address,
//             paymentMethod:"COD",
//             paymentStatus:"pending",
//             orderStatus:"placed",
//           totalAmount:product.price*quantity,
//         });

//         res.status(201).json({
//             success:true,
//             message:"order place successfull",
//             order,
//         });

//     }catch(error){

//         res.status(500).json({
//             success:false,
//             message:error.message
//         });
//     }
// }

// module.exports ={
//     Order
// }


const mongoose = require("mongoose");
const ordermodel = require("../Model/Order");

const Order = async (req, res) => {
  try {
    console.log("========== COD ORDER ==========");
    console.log("REQ.BODY:", JSON.stringify(req.body, null, 2));
    console.log("REQ.USER:", req.user);

    const {
      product,
      quantity,
      size,
      address,
    } = req.body;

    // =========================
    // VALIDATION
    // =========================

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product is required",
      });
    }

    if (!quantity) {
      return res.status(400).json({
        success: false,
        message: "Quantity is required",
      });
    }

    if (!size) {
      return res.status(400).json({
        success: false,
        message: "Size is required",
      });
    }

    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Address is required",
      });
    }

    // =========================
    // PRODUCT ID
    // =========================

    let productId;
    let productPrice;

    // Agar product poora object hai
    if (typeof product === "object") {
      productId = product._id || product.id;
      productPrice = Number(product.price);
    }

    // Agar product sirf ID hai
    else {
      productId = product;
    }

    console.log("PRODUCT ID:", productId);
    console.log("PRODUCT PRICE FROM BODY:", productPrice);

    // =========================
    // PRODUCT ID VALIDATION
    // =========================

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Product ID",
      });
    }

    // =========================
    // PRICE VALIDATION
    // =========================

    if (!productPrice || productPrice <= 0) {
      return res.status(400).json({
        success: false,
        message:
          "Product price is missing. Send product price from frontend.",
      });
    }

    // =========================
    // QUANTITY
    // =========================

    const qty = Number(quantity);

    if (!Number.isFinite(qty) || qty <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid quantity",
      });
    }

    // =========================
    // SIZE
    // =========================

    const selectedSize = Number(size);

    if (!Number.isFinite(selectedSize)) {
      return res.status(400).json({
        success: false,
        message: "Invalid size",
      });
    }

    // =========================
    // TOTAL AMOUNT
    // =========================

    const totalamount = productPrice * qty;

    console.log("PRODUCT PRICE:", productPrice);
    console.log("QUANTITY:", qty);
    console.log("TOTALAMOUNT:", totalamount);

    if (!Number.isFinite(totalamount) || totalamount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid total amount",
      });
    }

    // =========================
    // ORDER DATA
    // =========================

    const orderData = {
      user: req.user.id,

      product: productId,

      quantity: qty,

      size: selectedSize,

      paymentMethod: "COD",

      paymentStatus: "Pending",

      orderStatus: "placed",

      address: address,

      totalamount: totalamount,
    };

    console.log(
      "FINAL ORDER DATA:",
      JSON.stringify(orderData, null, 2)
    );

    // =========================
    // CREATE ORDER
    // =========================

    const order = await ordermodel.create(orderData);

    console.log("COD ORDER CREATED:", order);

    // =========================
    // SUCCESS
    // =========================

    return res.status(201).json({
      success: true,
      message: "COD order placed successfully",
      order,
    });

  } catch (error) {
    console.error("========== COD ORDER ERROR ==========");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  Order,
};