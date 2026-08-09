const jwt = require("jsonwebtoken");

const authmiddleware = (req, res, next) => {
    try {
        console.log("========== AUTH MIDDLEWARE ==========");

        console.log("Authorization Header:");
        console.log(req.headers.authorization);

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            console.log("❌ Authorization header missing");

            return res.status(401).json({
                success: false,
                message: "Authorization header missing"
            });
        }

        if (!authHeader.startsWith("Bearer ")) {
            console.log("❌ Bearer token missing");

            return res.status(401).json({
                success: false,
                message: "Bearer token missing"
            });
        }

        const token = authHeader.split(" ")[1];

        console.log("Token exists:", !!token);

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("✅ TOKEN VERIFIED");
        console.log("Decoded:", decoded);

        req.user = decoded;

        next();

    } catch (error) {

        console.log("❌ AUTH ERROR:", error.message);

        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = authmiddleware;