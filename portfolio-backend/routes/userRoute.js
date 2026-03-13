const express = require("express");
const router = express.Router();

const {
  updateUser,
  createUser,
  getUser,
  deleteUser,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// Public
router.get("/", getUser);

// Protected
router.post("/", authMiddleware, upload.single("profileImg"), createUser);
router.put("/", authMiddleware, upload.single("profileImg"), updateUser);
router.delete("/", authMiddleware, deleteUser);

module.exports = router;
