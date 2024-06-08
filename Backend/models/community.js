const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://via.placeholder.com/150/FF5733/FFFFFF?text=Community+Image",
    },
    banner: {
      type: String,
      default:
        "https://via.placeholder.com/800x200/FF5733/FFFFFF?text=Community+Banner",
    },
    desc: {
      type: String,
      required: true,
    },
    members: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Community = mongoose.model("Community", communitySchema);
module.exports = Community;
