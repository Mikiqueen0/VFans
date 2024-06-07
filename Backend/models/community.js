const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  community_name: {
    type: String,
    required: true,
  },
  community_image: {
    type: String,
  },
  community_banner: {
    type: String,
  },
  desc: {
    type: String,
    required: true,
  },
  members: {
    type: Array,
    default: [],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Community = mongoose.model("Community", communitySchema);
module.exports = Community;
