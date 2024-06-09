const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
});

const Like = mongoose.model("Like", likeSchema);
module.exports = Like;
