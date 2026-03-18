const mongoose = require("mongoose");
const slugify = require("slugify");
const cloudinary = require("cloudinary").v2;
const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["Frontend", "Backend", "Fullstack"],
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
    },
    role: String,

    duration: String,

    status: {
      type: String,
      enum: ["Live", "Development", "Completed"],
      default: "Completed",
    },

    team: String,

    year: String,

    github: String,

    live: String,

    problem: String,

    solution: String,

    features: [
      {
        type: String,
      },
    ],

    tech: [
      {
        type: String,
      },
    ],

    screenshots: [
      {
        url: String,
        public_id: String,
      },
    ],
    order: {
      type: Number,
      default: 0,
    },

    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
// projectSchema.post("findOneAndDelete", async function (doc) {
//   if (doc && doc.screenshots && doc.screenshots.length > 0) {
//     try {
//       const deletePromises = doc.screenshots.map((img) =>
//         cloudinary.uploader.destroy(img.public_id)
//       );
//       await Promise.all(deletePromises);
//       console.log("Successfully deleted images from Cloudinary");
//     } catch (error) {
//       console.error("Cloudinary deletion failed:", error);
//     }
//   }
// });

projectSchema.pre("save", function () {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
});

module.exports = mongoose.model("Project", projectSchema);
