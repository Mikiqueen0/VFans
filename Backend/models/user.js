const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  profileImage: {
    type: String,
    default:
      "https://www.gravatar.com/avatar/?d=mp&s=200",
  },
  profileBanner: {
    type: String,
    default:
      "https://via.placeholder.com/800x200/CCCCCC/808080?text=Banner",
  },
});

// Hash password before saving
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema);
