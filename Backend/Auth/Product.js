const express = require("express");
const productModel = require("../Model/ProductModel");


const addproduct = async (req, res) => {

    try {
        const { name, price, caption, category } = req.body;


        if (!name || !price || !caption || !category) {
            return res.status(500).json({
                success: false,
                message: "fill up"
            });
        }

        const image = req.file.path;

        if (!req.file) {
            return res.status(400).json({
                success: true,
                message: "please upload image",
            });
        }

        const product = await productModel.create({

            name,
            price,
            caption,
            category,
            image,

        });

        return res.status(201).json({
            success: true,
            product,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });

    }

}


const getproduct = async (req, res) => {
    try {

        const products = await productModel.find();

        res.status(200).json({
            success: true,
            products,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const deleteproduct = async (req, res) => {
    try {

        const { id } = req.params;
        const remove = await productModel.findOneAndDelete(id);

        if (remove) {
            return res.status(200).json({
                success: true,
                message: "remove",
            });
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
const dashboardproduct = async (req, res) => {
    try {
        const product = await productModel.find().sort({
            createdAt: -1
        });

        return res.status(200).json({
            product,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const addcart = async (req, res) => {
    try {
        console.log("ID:", req.params.id);

        const product = await productModel.findById(req.params.id);

        console.log(product);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            product,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
module.exports = {
    addproduct,
    getproduct,
    deleteproduct,
    dashboardproduct,
    addcart,
};