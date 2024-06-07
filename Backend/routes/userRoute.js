const { Profile, UpdateProfile } = require("../controllers/UserController");
const router = require("express").Router();

// Get Profile
router.get("/profile/:id", Profile);

// Update Profile
router.put("/profile/:id", UpdateProfile);

module.exports = router;
