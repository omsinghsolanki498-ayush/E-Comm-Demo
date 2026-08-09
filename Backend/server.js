const express = require("express");  // require express
const mongoose = require("mongoose"); // require mongoose
const connectDb = require("./config/DataBase"); // database center
require("dotenv").config(); // for use env 

connectDb(); // call database

const app = express();
const cors = require("cors"); // for frontend-backend setup

// middlewares

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());  // for json data
app.use(express.urlencoded({
  extended: true,
}));

app.use("/api/auth", require("./router/AuthRoute"));  // call from frontend
app.use("/api/product", require("./router/ProductRoute"));
app.use("/api/paymentverify", require("./router/paymentRoute"));

app.use("/api/stripe", require("./router/stripe"));
app.use("/api/order",require("./router/orderRoute"));
app.use("/api/product", require("./router/otherproduct"));
app.use("/api/admin",require("./router/Adminusers"));

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});