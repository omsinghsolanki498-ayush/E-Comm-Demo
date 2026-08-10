const jwt = require("jsonwebtoken");
const userModel = require("../Model/User");
const bcrypt = require("bcrypt");

// ================= REGISTER =================

const register = async (req, res) => {
    try {
        const name = req.body.name?.trim();
        const email = req.body.email?.trim().toLowerCase();
        const password = req.body.password;

        console.log("REGISTER BODY:", {
            name,
            email,
            password: password ? "***" : "",
        });

        // Check all fields
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }

        // Check existing user
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await userModel.create({
            name,
            email,
            password: hashPassword,
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                name: user.name,
                email: user.email,
                id: user._id,
                role: user.role,
            },
        });

    } catch (error) {
        console.error("REGISTER ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Registration failed",
            error: error.message,
        });
    }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN BODY:", {
      email,
      password: password ? "********" : "",
    });

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // ==========================================
    // FIND USER
    // ==========================================

    const user = await userModel.findOne({email})
    //   email: email.trim().toLowerCase(),
    

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // ==========================================
    // CHECK PASSWORD
    // ==========================================

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    // ==========================================
    // CREATE JWT
    // ==========================================

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // ==========================================
    // SUCCESS
    // ==========================================

    return res.status(200).json({
      message: "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
    register,
  login,
};
