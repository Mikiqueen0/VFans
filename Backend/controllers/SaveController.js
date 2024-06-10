const Save = require("../models/save");
const User = require("../models/user");
const io = require("../index");
const mongoose = require("mongoose");

// Like Post
module.exports.SavePost = async (req, res, next) => {
    const { userID, postID } = req.body;
    try {
        const existingSave = await Save.findOne({ userID, postID });
        if (existingSave) {
        const save = await Save.deleteOne({ userID, postID });
        res
            .status(200)
            .json({ success: true, message: "Post unliked successfully", save });
        } else {
        const newSave = new Save({ userID, postID });
        const save = await newSave.save();
        res
            .status(200)
            .json({ success: true, message: "Post liked successfully", save });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Like Count
module.exports.GetAllSave = async (req, res, next) => {
    const postID = req.params.id;
    try {
        const allSave = await Save.find({ postID });
        res.status(200).json({ success: true, allSave });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get User Like Posts
module.exports.GetUserSavePost = async (req, res, next) => {
    const { username } = req.params;
    try {
    const user = await User.findOne({ username });
    if (!user) {
        return res
        .status(404)
        .json({ success: false, message: "User not found" });
    };

    const allSave = await Save.find({ userID: user._id })
        .populate({
        path: 'postID',
        populate: [
            { path: 'communityID' },
            { path: 'userID' }
        ]
    });;
    res.status(200).json({ success: true, allSave });
    } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
    }
};
