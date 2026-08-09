const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    caption: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        required: true,
    },

    size: {
        type: String,
    }

}, {
    timestamps: true,
});

// module.exports = productSchema;
module.exports = mongoose.model("Product", productSchema);