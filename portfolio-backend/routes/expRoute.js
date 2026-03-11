const express = require("express");
const router = express.Router();

const {
  addExperience,
  deleteExperience,
  editExperience,
  getAllExps,
} = require("../controllers/experienceController");

const authMiddleware = require("../middleware/authMiddleware");

// Public
router.get("/", getAllExps);

// Protected
router.post("/", authMiddleware, addExperience);
router.put("/:slug", authMiddleware, editExperience);
router.delete("/:slug", authMiddleware, deleteExperience);

module.exports = router;
