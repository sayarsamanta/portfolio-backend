const express = require("express");
const router = express.Router();

const {
  updateUser,
  createUser,
  getUser,
  deleteUser,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

// Public
router.get("/", getUser);

// Protected
router.post("/", authMiddleware, createUser);
router.put("/", authMiddleware, updateUser);
router.delete("/", authMiddleware, deleteUser);

module.exports = router;
