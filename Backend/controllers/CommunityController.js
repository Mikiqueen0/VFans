const Community = require("../models/community");

// Create Community
module.exports.CreateCommunity = async (req, res, next) => {
  try {
    const newCommunity = new Community({
      userID: req.body.userID,
      community_name: req.body.community_name,
      community_image: req.body.community_image,
      community_banner: req.body.community_banner,
      desc: req.body.desc,
    });
    const community = await newCommunity.save();
    res.status(200).json({ success: true, community });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get All Community
module.exports.GetAllCommunity = async (req, res, next) => {
  try {
    const community = await Community.find();
    if (!community) {
      return res
        .status(404)
        .json({ success: false, message: "Community not found" });
    }
    res.status(200).json({ success: true, community });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get A Community
module.exports.GetCommunity = async (req, res, next) => {
  try {
    const community = await Community.findById(req.params.id);
    if (!community) {
      return res
        .status(404)
        .json({ success: false, message: "Community not found" });
    }
    res.status(200).json({ success: true, community });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update
module.exports.UpdateCommunity = async (req, res, next) => {
  try {
    const community = await Community.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!community) {
      return res
        .status(404)
        .json({ success: false, message: "Community not found" });
    }
    res.status(200).json({ success: true, community });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete
module.exports.DeleteCommunity = async (req, res, next) => {
  try {
    const community = await Community.findByIdAndDelete(req.params.id);
    if (!community) {
      return res
        .status(404)
        .json({ success: false, message: "Community not found" });
    }
    res.status(200).json({ success: true, message: "Community deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
