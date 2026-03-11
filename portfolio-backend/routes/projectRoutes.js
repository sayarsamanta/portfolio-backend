const express = require("express");
const router = express.Router();

const {
  createProject,
  getAllProjects,
  getProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const authMiddleware = require("../middleware/authMiddleware");

// Public
router.get("/", getAllProjects);
router.get("/:slug", getProject);

// Protected
router.post("/", authMiddleware, createProject);
router.put("/:slug", authMiddleware, updateProject);
router.delete("/:slug", authMiddleware, deleteProject);

module.exports = router;
