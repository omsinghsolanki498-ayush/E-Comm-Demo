const express = require("express");
const jwt = require("jsonwebtoken");
const CookieParser = require("cookie-parser");
const userModel = require("../Model/User");
const bcrypt = require("bcrypt");

const register = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "please fill all the fields",
            });
        };

        const existinguser = await userModel.findOne({ email });

        if (existinguser) {
            return res.status(400).json({
                success: false,
                message: "user already exists",
            });
        };

        const hashpassword = await bcrypt.hash(password, 10);
        // console.log(hashpassword);

        const user = await userModel.create({
            name,
            email,
            password: hashpassword,

        });

        return res.status(201).json({
            success: true,
            message: "user registered successfully",
            user,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error",
        });
    }
}

const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "please fill all the fields",
            });
        };

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not found",
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "invalid password",
            });
        };

        const token = jwt.sign({
            id: user._id,
            email: user.email,
            role: user.role,
        

        }, process.env.JWT_SECRET, {

            expiresIn: "1d",

        })
         console.log(user.role);

        return res.status(200).json({
            success: true,
            message: "user Logged in successfully",
            token,
            user: {
                name: user.name,
                email: user.email,
                id: user._id,
                role: user.role,
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    };
};

module.exports = {
    register,
    login,
};