const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
  following_communityID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

const Follow = mongoose.model("Follow", followSchema);
module.exports = Follow;
