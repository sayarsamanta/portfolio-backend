const mongoose = require("mongoose");
const slugify = require("slugify");
const expSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      require: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    company: {
      type: String,
      require: true,
      trim: true,
    },
    duration: {
      type: String,
      require: true,
      trim: true,
    },
    description: {
      type: String,
      require: true,
    },
    tech: {
      type: [String],
      require: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

expSchema.pre("save", function () {
  if (this.company && this.isModified("company")) {
    this.slug = slugify(this.company, { lower: true, strict: true });
  }
});

expSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.company) {
    let newSlug = slugify(update.company, { lower: true, strict: true });
    update.slug = newSlug;
    this.setUpdate(update);
  }
});
module.exports = mongoose.model("Experience", expSchema);
