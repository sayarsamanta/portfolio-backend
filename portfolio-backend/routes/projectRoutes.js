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
const upload = require("../middleware/upload");

// Public
router.get("/", getAllProjects);
router.get("/:slug", getProject);

// Protected
router.post(
  "/",
  authMiddleware,
  upload.array("screenshots", 10),
  createProject
);
router.put(
  "/:slug",
  authMiddleware,
  upload.array("screenshots", 10),
  updateProject
);
router.delete("/:slug", authMiddleware, deleteProject);

module.exports = router;
