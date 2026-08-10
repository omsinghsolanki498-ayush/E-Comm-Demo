// require("dotenv").config();

const express = require("express");
const connectDb = require("./config/DataBase");
const cors = require("cors");

const app = express();

// ================= DATABASE =================
connectDb();

// ================= CORS =================
const allowedOrigins = [
  "http://localhost:5173",
  "https://e-comm-demo-five.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without origin, e.g. Postman/server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked CORS Origin:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ================= MIDDLEWARE =================
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.json({
    message: "E-Commerce Backend is running",
  });
});

// ================= ROUTES =================
app.use("/api/auth", require("./router/AuthRoute"));
app.use("/api/product", require("./router/ProductRoute"));
app.use("/api/paymentverify", require("./router/paymentRoute"));
app.use("/api/stripe", require("./router/stripe"));
app.use("/api/order", require("./router/orderRoute"));
app.use("/api/product", require("./router/otherproduct"));
app.use("/api/admin", require("./router/Adminusers"));

// ================= SERVER =================
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});