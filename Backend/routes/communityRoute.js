const {
  CreateCommunity,
  GetAllCommunity,
  GetCommunity,
  UpdateCommunity,
  DeleteCommunity,
  JoinCommunity,
  GetCommunityMember
} = require("../controllers/CommunityController");
const router = require("express").Router();

// Create
router.post("/create", CreateCommunity);

// Get All Community
router.get("/all", GetAllCommunity);

// Get A Community
router.get("/:id", GetCommunity);

// Get Member
router.get("/member/:id", GetCommunityMember);

// Update
router.put("/:id", UpdateCommunity);

// Join Community
router.put("/join/:id", JoinCommunity);

// Delete
router.delete("/:id", DeleteCommunity);

module.exports = router;
