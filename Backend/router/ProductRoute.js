const express = require("express");

const router = express.Router();

const upload = require("../Middleware/Multer");
const authmiddleware = require("../Middleware/AuthMiddleware");
const adminMiddleware = require("../Middleware/AdminMiddleware");
// database

const {addproduct,getproduct,deleteproduct,dashboardproduct,addcart} = require("../Auth/Product");

router.post("/add",authmiddleware,adminMiddleware,upload.single("image"),addproduct);
router.get("/all",authmiddleware,adminMiddleware, getproduct);
router.delete("/delete/:id",authmiddleware,adminMiddleware,deleteproduct);
router.get("/dashboardproduct",authmiddleware,dashboardproduct);
router.post("/addcart/:id",authmiddleware,addcart);

module.exports =  router;