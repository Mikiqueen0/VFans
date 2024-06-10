const mongoose = require("mongoose");

const saveSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  }
});

const Save = mongoose.model("Save", saveSchema);
module.exports = Save;
