const Like = require("../models/like");
const User = require("../models/user");
const io = require("../index");
const mongoose = require("mongoose");

// Like Post
module.exports.LikePost = async (req, res, next) => {
  const { userID, postID } = req.body;
  try {
    const existingLike = await Like.findOne({ userID, postID });
    if (existingLike) {
      const like = await Like.deleteOne({ userID, postID });
      res
        .status(200)
        .json({ success: true, message: "Post unliked successfully", like });
    } else {
      const newLike = new Like({ userID, postID });
      const like = await newLike.save();
      res
        .status(200)
        .json({ success: true, message: "Post liked successfully", like });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Like Count
module.exports.GetLikeCount = async (req, res, next) => {
  const postID = req.params.id;
  try {
    const allLike = await Like.find({ postID });
    res.status(200).json({ success: true, allLike });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get User Like Posts
module.exports.GetUserLikePost = async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    };

    const allLike = await Like.find({ userID: user._id })
      .populate({
        path: 'postID',
        populate: [
          { path: 'communityID' },
          { path: 'userID' }
        ]
    });;
    res.status(200).json({ success: true, allLike });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
