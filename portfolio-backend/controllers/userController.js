const User = require("../models/userModel");
const cloudinary = require("cloudinary").v2;
const { getPublicId } = require("../utils/validators");
// GET USER
const getUser = async (req, res) => {
  try {
    const user = await User.findOne();

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({ data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createUser = async (req, res) => {
  try {
    let payload = {};

    if (req.body.data) {
      payload = JSON.parse(req.body.data);
    } else {
      payload = req.body;
    }
    const existing = await User.findOne();

    if (existing) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    if (req.file) {
      // delete old image

      payload.profileImg = req.file.path;
    }
    if (payload?.about?.personalInterests) {
      const interests = payload.about.personalInterests;

      if (Array.isArray(interests) && typeof interests[0] === "object") {
        payload.about.personalInterests = Object.values(interests[0]);
      }
      console.log(interests);
    }
    if (req.body.about) {
      payload.about = JSON.parse(req.body.about);
    }

    const user = await User.create(payload);

    res.status(201).json({
      message: "User created successfully",
      imageUrl: req.file?.path,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// const updateUser = async (req, res) => {
//   try {
//     const user = await User.findOneAndUpdate({}, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     res.json({
//       message: "User updated successfully",
//       data: user,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
const updateUser = async (req, res) => {
  try {
    const existing = await User.findOne();
    let payload = {};

    if (req.body.data) {
      payload = JSON.parse(req.body.data);
    } else {
      payload = req.body;
    }

    // if image uploaded
    if (req.file) {
      if (existing?.profileImg) {
        const publicId = getPublicId(existing.profileImg);
        await cloudinary.uploader.destroy(publicId);
      }
      payload.profileImg = req.file.path;
    }
    if (payload.about && typeof payload.about === "string") {
      payload.about = JSON.parse(payload.about);
    }

    const updatedUser = await User.findOneAndUpdate(
      {},
      { $set: payload },
      { returnDocument: "after", runValidators: true }
    );

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete();

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateUser, createUser, getUser, deleteUser };
