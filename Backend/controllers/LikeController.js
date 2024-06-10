const Like = require("../models/like");
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
    const likeCount = await Like.countDocuments({ postID });
    res.status(200).json({ success: true, likeCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
