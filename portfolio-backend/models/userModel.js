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
    issuer: String,
    year: String,
    description: String,
    icon: String,
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
    },

    skills: {
      type: [skillSchema],
      default: [],
    },

    achievements: [achievementSchema],

    education: [educationSchema],

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
      required: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    role: {
      type: String,
      default: "admin",
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
