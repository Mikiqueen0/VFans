const Post = require("../models/post");
const Community = require("../models/community");
const mongoose = require("mongoose");

// Create
module.exports.CreatePost = async (req, res, next) => {
  try {
    const newPost = new Post({
      userID: req.body.userID,
      communityID: req.body.communityID,
      desc: req.body.desc,
      image: req.body.image,
      video: req.body.video,
      tag: req.body.tag,
    });
    const post = await newPost.save();
    res.status(200).json({ success: true, post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get A Post
module.exports.GetPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    res.status(200).json({ success: true, post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get All Post
module.exports.GetAllPost = async (req, res, next) => {
  try {
    const post = await Post.find();
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    res.status(200).json({ success: true, post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update
module.exports.UpdatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete
module.exports.DeletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    res.status(200).json({ success: true, message: "Post deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Search
module.exports.SearchPost = async (req, res, next) => {
  const { query } = req.query;
  try {
    if (!query) {
      return res
        .status(400)
        .json({ success: false, message: "Query parameter is required" });
    }
    const post = await Post.find({
      $or: [
        { tag: { $regex: query, $options: "i" } },
        { desc: { $regex: query, $options: "i" } },
      ],
    }).sort({ timestamp: -1 });
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    res.status(200).json({ success: true, post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server ay" });
  }
};

// Get All Post with same community
module.exports.GetAllPostSameCommunity = async (req, res, next) => {
  const { communityID } = req.params;

  try {
    // Validate communityID
    if (!mongoose.Types.ObjectId.isValid(communityID)) {
      return res.status(400).json({ error: "Invalid community ID" });
    }

    // Find all posts with the given communityID
    const posts = await Post.find({ communityID: communityID })
      .populate("userID", "username email")
      .exec();

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get All Post from joined community
module.exports.GetAllPostFromJoinedCommunity = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Find communities that the user has joined
    const communities = await Community.find({ members: userId }).select("_id");
    const communityIds = communities.map((community) => community._id);

    // Find posts from these communities
    const posts = await Post.find({ communityID: { $in: communityIds } })
      .populate("userID", "username email")
      .populate("communityID", "name");

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
