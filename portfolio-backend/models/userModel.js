const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    percentage: Number,
    type: String,
  },
  { _id: false }
);

const achievementSchema = new mongoose.Schema(
  {
    id: String,
    title: String,
    year: String,
    description: String,
    type: String,
  },
  { _id: false }
);

const educationSchema = new mongoose.Schema(
  {
    id: String,
    degree: String,
    institution: String,
    location: String,
    duration: String,
    grade: String,
    description: String,
    logo: String,
  },
  { _id: false }
);

const aboutSchema = new mongoose.Schema(
  {
    intro: {
      headline: { type: String, default: "" },
      subText: { type: String, default: "" },
      story: { type: String, default: "" },
      bio: { type: String, default: "" },
      brief: { type: String, default: "" },
      qoute: { type: String, default: "" },
      profileImg: { type: String, default: "" },
    },

    skills: {
      type: [skillSchema],
      default: [],
    },

    achievements: {
      type: [achievementSchema],
      default: [],
    },

    education: {
      type: [educationSchema],
      default: [],
    },

    personalInterests: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: "user_001",
    },

    name: {
      type: String,
    },

    username: {
      type: String,
      unique: true,
    },

    email: {
      type: String,
      unique: true,
    },

    role: {
      type: String,
      default: "admin",
    },
    resume: {
      type: String,
    },
    resumePublicId: {
      type: String,
    },

    profileImg: String,

    bio: String,

    quote: String,

    social: {
      github: String,
      linkedin: String,
      twitter: String,
      portfolio: String,
    },

    stats: {
      projects: {
        type: Number,
        default: 0,
      },
      experienceYears: {
        type: Number,
        default: 0,
      },
      clients: {
        type: Number,
        default: 0,
      },
    },

    settings: {
      theme: {
        type: String,
        default: "light",
      },
      notifications: {
        type: Boolean,
        default: true,
      },
    },

    about: aboutSchema,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
