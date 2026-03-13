const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio/resumes",
    resource_type: "raw", // required for PDF
    format: async () => "pdf",
  },
});

const uploadResume = multer({ storage });

module.exports = uploadResume;
