const Community = require("../models/community");

// Create Community
module.exports.CreateCommunity = async (req, res, next) => {
  const { name, desc, userID } = req.body; 
  try {
    // const newCommunity = new Community({
    //   userID: req.body.userID,
    //   community_name: req.body.community_name,
    //   community_image: req.body.community_image,
    //   community_banner: req.body.community_banner,
    //   desc: req.body.desc,
    // });
    const newCommunity = new Community({
      userID,
      name,
      desc,
      members: [userID]
    });
    const community = await newCommunity.save();
    res.status(200).json({ success: true, community });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
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

// Get Community Member
module.exports.GetCommunityMember = async (req, res, next) => {
  try {
    const community = await Community.findById(req.params.id).populate("members");
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

module.exports.JoinCommunity = async (req, res, next) => {
  try {
    const community = await Community.findById(req.params.id);
    if (!community) {
      return res.status(404).json({ success: false, message: "Community not found" });
    }

    const userId = req.body.userID;

    if (community.members.includes(userId)) {
      const index = community.members.indexOf(userId);
      community.members.splice(index, 1);
    } else {
      community.members.push(userId);
    }

    const updatedCommunity = await community.save();

    res.status(200).json({ success: true, community: updatedCommunity });
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
