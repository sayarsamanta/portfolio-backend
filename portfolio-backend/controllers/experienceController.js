const Experience = require("../models/experienceModel");
const { generateSlug, validateExperienceData } = require("../utils/validators");

// ADD EXPERIENCE
const addExperience = async (req, res) => {
  try {
    const data = req.body;
    if (!data) {
      return res.status(400).json({ message: "Missing experience data" });
    }
    validateExperienceData(data);

    const slug = generateSlug(data.company);

    // Check slug uniqueness
    const existing = await Experience.findOne({ slug });
    if (existing)
      return res
        .status(400)
        .json({ message: "Experience for this company already exists." });

    const exp = await Experience.create({ ...data, slug });
    res
      .status(201)
      .json({ message: "Experience added successfully", data: exp });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL EXPERIENCE
const getAllExps = async (req, res) => {
  try {
    const exp = await Experience.find().sort({ updatedAt: -1 });
    res.json({ data: exp });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// EDIT EXPERIENCE
const editExperience = async (req, res) => {
  try {
    validateExperienceData(req.body);

    const newSlug = generateSlug(req.body.company);

    const exp = await Experience.findOneAndUpdate(
      { slug: req.params.slug },
      { ...req.body, slug: newSlug },
      { new: true, runValidators: true }
    );

    if (!exp) return res.status(404).json({ message: "Experience not found." });

    res.json({ message: "Experience edited successfully", data: exp });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE EXPERIENCE
const deleteExperience = async (req, res) => {
  try {
    const exp = await Experience.findOneAndDelete({
      slug: req.params.slug,
    });
    if (!exp) return res.status(404).json({ message: "Experience not found." });
    res.json({ message: "Experience deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addExperience,
  getAllExps,
  editExperience,
  deleteExperience,
};
