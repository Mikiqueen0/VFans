const Post = require("../models/post");
const User = require("../models/user");

// Create
module.exports.CreatePost = async (req, res, next) => {
  const { userID, communityID, desc, image, video, tag } = req.body;
  try {
    const newPost = new Post({
      userID,
      communityID,
      desc,
      image,
      video,
      tag,
    });
    const post = await newPost.save();
    res.status(200).json({ success: true, post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
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

// Get All Post By Username
module.exports.GetUserPost = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const posts = await Post.find({ userID: user._id })
      .populate('userID')
      .populate('communityID')
      .sort({ createdAt: -1 });
    if (!posts) {
      return res.status(404).json({ success: false, message: "Posts not found" });
    }

    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get All Post By Username
module.exports.GetCommunityPost = async (req, res, next) => {
  const { communityID } = req.params;
  try {
    const posts = await Post.find({ communityID: communityID })
      .populate('userID')
      .populate('communityID')
      .sort({ createdAt: -1 });
    if (!posts) {
      return res.status(404).json({ success: false, message: "Posts not found" });
    }

    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get All Post
module.exports.GetAllPost = async (req, res, next) => {
  try {
    const post = await Post.find().populate("userID").populate("communityID");
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
