const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  communityID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  video: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  tag: {
    type: Array,
    default: [],
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
