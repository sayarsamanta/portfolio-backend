// middleware/upload.js

const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "profile_images",
    allowed_formats: ["jpg", "png", "jpeg", "svg"],
  },
});

const upload = multer({ storage });

module.exports = upload;
