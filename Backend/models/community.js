const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const communitySchema = new mongoose.Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    banner: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Community", communitySchema);
