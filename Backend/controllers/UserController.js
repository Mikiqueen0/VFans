const User = require("../models/user");
const mongoose = require('mongoose');

// Profile
module.exports.Profile = async (req, res, next) => {
  // const user = req.params.id;
  // res.status(200).json({ success: true, user: req.params.id });
  const params = req.params.id;
  try {
    // const user = await User.findById(params);
    // const user = await User.findOne({ $or: [{ _id: params }, { username: params }] });

    let user;
    if (mongoose.Types.ObjectId.isValid(params)) {
      user = await User.findById(params);
    } else {
      user = await User.findOne({ username: params });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

// Update
module.exports.UpdateProfile = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      { new: true }
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
