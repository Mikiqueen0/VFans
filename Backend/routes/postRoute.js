const {
  CreatePost,
  GetAllPost,
  GetPost,
  UpdatePost,
  DeletePost,
  SearchPost,
  GetAllPostSameCommunity,
  GetAllPostFromJoinedCommunity,
} = require("../controllers/PostController");
const router = require("express").Router();

// Create
router.post("/create", CreatePost);

// Get All Post
router.get("/all", GetAllPost);

// Search Post
router.get("/search", SearchPost);

// Get A Post
router.get("/:id", GetPost);

// Update Post
router.put("/:id", UpdatePost);

// Delete Post
router.delete("/:id", DeletePost);

// Get All Post with same community
router.get("/community/:communityID", GetAllPostSameCommunity);

// Get All Post from joined community
router.get("/user/:userId/community-posts", GetAllPostFromJoinedCommunity);

module.exports = router;
