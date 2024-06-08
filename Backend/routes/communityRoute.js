const {
  CreateCommunity,
  GetAllCommunity,
  GetCommunity,
  UpdateCommunity,
  DeleteCommunity,
  JoinCommunity
} = require("../controllers/CommunityController");
const router = require("express").Router();

// Create
router.post("/create", CreateCommunity);

// Get All Community
router.get("/all", GetAllCommunity);

// Get A Community
router.get("/:id", GetCommunity);

// Update
router.put("/:id", UpdateCommunity);

// Join Community
router.put("/join/:id", JoinCommunity);

// Delete
router.delete("/:id", DeleteCommunity);

module.exports = router;
