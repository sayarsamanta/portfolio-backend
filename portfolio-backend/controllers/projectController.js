const Project = require("../models/projectModel");
const { generateSlug, validateProjectData } = require("../utils/validators");

// CREATE PROJECT
const createProject = async (req, res) => {
  try {
    // 1. Get the raw body
    const rawBody =
      typeof req.body.data === "string" ? JSON.parse(req.body.data) : req.body;

    // 2. Normalize Arrays IMMEDIATELY
    // This converts 'React' (string) into ['React'] (array)
    const tech = Array.isArray(rawBody.tech)
      ? rawBody.tech
      : rawBody.tech
      ? [rawBody.tech]
      : [];

    const features = Array.isArray(rawBody.features)
      ? rawBody.features
      : rawBody.features
      ? [rawBody.features]
      : [];

    // 3. Define the slug using the correct field (check if it's name or title!)
    const slugSource = rawBody.name || rawBody.title;

    if (!slugSource) {
      return res.status(400).json({
        message: "Cannot create slug: Project name or title is missing.",
      });
    }
    const slug = generateSlug(rawBody.name || rawBody.title);

    // 4. Map the Cloudinary files
    const screenshots = req.files
      ? req.files.map((file) => ({
          url: file.path,
          public_id: file.filename,
        }))
      : [];

    // 5. Build the final object EXPLICITLY
    // Do not spread the whole req.body if you want to be safe
    const finalProjectData = {
      ...rawBody, // Bring in description, github, etc.
      tech, // Overwrite with the verified Array
      features, // Overwrite with the verified Array
      slug, // Add the slug
      screenshots: screenshots, // Add the Cloudinary links
    };

    const project = await Project.create(finalProjectData);

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL PROJECTS
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ updatedAt: -1 });
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
    const { screenshots: blobStrings, ...updateData } = req.body;
    const newSlug = generateSlug(req.body.title);
    const existingSlug = await Project.findOne({
      slug: newSlug,
      _id: { $ne: req.params.id },
    });
    if (existingSlug)
      return res.status(400).json({ message: "Project title already exists." });
    const tech = Array.isArray(req.body.tech)
      ? req.body.tech.flat()
      : req.body.tech
      ? [req.body.tech]
      : [];
    const screenshots = req.files
      ? req.files.map((file) => ({
          url: file.path,
          public_id: file.filename,
        }))
      : [];

    if (screenshots.length > 0) {
      updateData.screenshots = screenshots;
    }

    const project = await Project.findOneAndUpdate(
      { slug: req.params.slug },
      { ...updateData, slug: newSlug, tech: tech },
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
