const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../configCloud/Cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "puma_shoes_product",
    allowed_formats: ["jpg", "jpeg", "png","avif"],
  },
});

const upload = multer({ storage });

module.exports = upload;