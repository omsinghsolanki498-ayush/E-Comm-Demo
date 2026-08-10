require("dotenv").config();

const express = require("express");
const connectDb = require("./config/DataBase");
const cors = require("cors");

const app = express();

// ================= DATABASE =================

connectDb();

// ================= MIDDLEWARE =================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// ================= ROUTES =================

app.use(
  "/api/auth",
  require("./router/AuthRoute")
);

app.use(
  "/api/product",
  require("./router/ProductRoute")
);

app.use(
  "/api/paymentverify",
  require("./router/paymentRoute")
);

app.use(
  "/api/stripe",
  require("./router/stripe")
);

app.use(
  "/api/order",
  require("./router/orderRoute")
);

app.use(
  "/api/product",
  require("./router/otherproduct")
);

app.use(
  "/api/admin",
  require("./router/Adminusers")
);

// ================= SERVER =================

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});