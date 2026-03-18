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
    res.status(200).json({ message: "resume deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "error deleting resume" });
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

    // Remove resume info from DB
    user.resume = null;
    user.resumePublicId = null;
    await user.save();

    res.status(201).json({
      success: true,
      message: "Resume deleted successfully",
      data: user,
    });
  } catch (err) {
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

      res.status(201).json({
        message: "Upload successful",
        user: user,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
