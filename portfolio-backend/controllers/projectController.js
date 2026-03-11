const Project = require("../models/projectModel");
const { generateSlug, validateProjectData } = require("../utils/validators");

// CREATE PROJECT
const createProject = async (req, res) => {
  try {
    validateProjectData(req.body);

    const slug = generateSlug(req.body.title);
    const existing = await Project.findOne({ slug });
    if (existing)
      return res
        .status(400)
        .json({ message: "Project with this title already exists." });

    const project = await Project.create({ ...req.body, slug });
    res
      .status(201)
      .json({ message: "Project created successfully", data: project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL PROJECTS
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.json({ data: projects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE PROJECT
const getProject = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ data: project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PROJECT
const updateProject = async (req, res) => {
  try {
    validateProjectData(req.body);

    const newSlug = generateSlug(req.body.title);
    const existingSlug = await Project.findOne({
      slug: newSlug,
      _id: { $ne: req.params.id },
    });
    if (existingSlug)
      return res
        .status(400)
        .json({ message: "Another project with this title already exists." });

    const project = await Project.findOneAndUpdate(
      { slug: req.params.slug },
      { ...req.body, slug: newSlug },
      { new: true, runValidators: true }
    );

    if (!project) return res.status(404).json({ message: "Project not found" });

    res.json({ message: "Project updated successfully", data: project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE PROJECT
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ slug: req.params.slug });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProject,
  updateProject,
  deleteProject,
};
