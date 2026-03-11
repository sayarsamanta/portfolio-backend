const User = require("../models/userModel");
const { diff } = require("deep-object-diff");
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
    const existing = await User.findOne();

    if (existing) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    if (req.body?.about?.personalInterests) {
      const interests = req.body.about.personalInterests;

      if (Array.isArray(interests) && typeof interests[0] === "object") {
        req.body.about.personalInterests = Object.values(interests[0]);
      }
      console.log(interests);
    }

    const user = await User.create(req.body);

    res.status(201).json({
      message: "User created successfully",
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
    const updatedUser = await User.findOneAndUpdate(
      {},
      { $set: req.body },
      { new: true, runValidators: true }
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
