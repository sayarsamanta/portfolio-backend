// utils/validators.js
const slugify = require("slugify");
const mongoose = require("mongoose");

// Generate slug from a string
const generateSlug = (text) => slugify(text, { lower: true, strict: true });

// Validate required fields for Experience
const validateExperienceData = (data) => {
  const { role, company, duration, description, tech } = data || {};
  if (!role || !company || !duration || !description) {
    throw new Error(
      "All required fields (role, company, duration, description, tech) must be provided."
    );
  }
  if (!Array.isArray(tech) || tech.some((t) => typeof t !== "string")) {
    throw new Error("Tech must be an array of strings.");
  }
};

// Validate required fields for Project
const validateProjectData = (data) => {
  const { title, description, techStack, link } = data;
  if (!title || !description || !techStack?.length) {
    throw new Error(
      "All required fields (title, description, techStack) must be provided."
    );
  }
  if (
    !Array.isArray(techStack) ||
    techStack.some((t) => typeof t !== "string")
  ) {
    throw new Error("techStack must be an array of strings.");
  }
  if (link) {
    try {
      new URL(link);
    } catch {
      throw new Error("Invalid URL for project link.");
    }
  }
};

const getPublicId = (url) => {
  const parts = url.split("/");
  const file = parts.pop();
  const folder = parts.pop();
  const publicId = `${folder}/${file.split(".")[0]}`;
  return publicId;
};

// Validate MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

module.exports = {
  generateSlug,
  validateExperienceData,
  validateProjectData,
  isValidObjectId,
  getPublicId,
};
