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
    type: Array,
    default: [],
  },
  video: {
    type: Array,
    default: [],
  },
  tag: {
    type: Array,
    default: [],
  },
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
