const express = require("express");
const uploadResume = require("../middleware/uploadResume.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const cloudinary = require("../config/cloudinary");
const User = require("../models/userModel.js");

const router = express.Router();
const deleteResume = async (publicId) => {
  try {
    if (!publicId) return;
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "raw",
    });
    console.log("Deleted existing resume:", result);
  } catch (err) {
    console.error("Error deleting resume:", err);
  }
};

router.delete("/resume", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne();

    if (!user.resumePublicId) {
      return res.status(404).json({ error: "No resume found to delete" });
    }

    // Delete file from Cloudinary
    const result = await cloudinary.uploader.destroy(user.resumePublicId, {
      resource_type: "raw",
    });

    console.log("Deleted resume:", result);

    // Remove resume info from DB
    user.resume = null;
    user.resumePublicId = null;
    await user.save();

    res.json({ success: true, message: "Resume deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete resume" });
  }
});
router.post(
  "/upload-resume",
  authMiddleware,
  uploadResume.single("resume"),
  async (req, res) => {
    try {
      const user = await User.findOne();
      if (user.resumePublicId) {
        await deleteResume(user.resumePublicId);
      }
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "portfolio/resumes",
        resource_type: "raw",
        public_id: "resume",
        overwrite: true,
        type: "upload",
        access_mode: "public",
      });

      if (user) {
        user.resume = result.secure_url;
        user.resumePublicId = result.public_id;
        await user.save();
      }

      res.json({
        message: "Upload successful",
        url: result.secure_url,
        public_id: result.public_id,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
