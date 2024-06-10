const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const Community = require("../models/community");
const Save = require("../models/save");
const mongoose = require("mongoose");

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
    const posts = await newPost.save();
    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get A Post
module.exports.GetPost = async (req, res, next) => {
  try {
    const posts = await Post.findById(req.params.id)
      .populate("userID")
      .populate("communityID");
    if (!posts) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    res.status(200).json({ success: true, posts });
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
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const posts = await Post.find({ userID: user._id })
      .populate("userID")
      .populate("communityID")
      .sort({ createdAt: -1 });
    if (!posts) {
      return res
        .status(404)
        .json({ success: false, message: "Posts not found" });
    }

    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get All Post in Community
module.exports.GetCommunityPost = async (req, res, next) => {
  const { communityID } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(communityID)) {
      return res.status(400).json({ error: "Invalid community ID" });
    }
    const posts = await Post.find({ communityID: communityID })
      .populate("userID")
      .populate("communityID")
      .sort({ createdAt: -1 });
    if (!posts) {
      return res
        .status(404)
        .json({ success: false, message: "Posts not found" });
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
    const posts = await Post.find()
      .populate("userID")
      .populate("communityID")
      .sort({ createdAt: -1 });
    if (!posts) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update
module.exports.UpdatePost = async (req, res, next) => {
  try {
    const posts = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!posts) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete
module.exports.DeletePost = async (req, res, next) => {
  const { postID } = req.params;
  try {
    const posts = await Post.findByIdAndDelete({ postID });
    if (!posts) {
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
    const posts = await Post.find({
      $or: [
        { tag: { $regex: query, $options: "i" } },
        { desc: { $regex: query, $options: "i" } },
      ],
    }).sort({ timestamp: -1 });
    if (!posts) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server ay" });
  }
};

// // Get All Post from joined community
// module.exports.GetAllJoinedCommunity = async (req, res, next) => {
//   try {
//     const { userID } = req.params;

//     // Find communities that the user has joined
//     const communities = await Community.find({ members: userID }).select("_id");
//     const communityIds = communities.map((community) => community._id);

//     // Find posts from these communities
//     const posts = await Post.find({ communityID: { $in: communityIds } })
//       .populate("userID", "username email")
//       .populate("communityID", "name");

//     res.status(200).json(posts);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

module.exports.GetAllJoinedCommunity = async (req, res, next) => {
  try {
    const { userID } = req.params;

    // Validate userID
    if (!mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    // Find communities that the user has joined
    const communities = await Community.find({ members: userID }).select("_id");
    if (!communities.length) {
      return res.status(200).json({ posts: [] });
    }

    const communityIds = communities.map((community) => community._id);

    // Find posts from these communities
    const posts = await Post.find({ communityID: { $in: communityIds } })
      .populate("userID")
      .populate("communityID")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Post Comment
module.exports.PostComment = async (req, res, next) => {
  const { userID, postID, content } = req.body;
  try {
    const newComment = new Comment({
      userID,
      postID,
      content,
    });
    const comments = await newComment.save();
    res.status(200).json({ success: true, comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Post Comment
module.exports.GetPostComment = async (req, res, next) => {
  const { postID } = req.params;
  try {
    const comments = await Comment.find({ postID })
      .populate("userID")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get Post Comment
module.exports.GetPostCommentNumber = async (req, res, next) => {
  const { postID } = req.params;
  try {
    const comments = await Comment.find({ postID }).countDocuments();
    res.status(200).json({ success: true, comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};