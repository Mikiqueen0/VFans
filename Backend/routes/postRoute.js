const {
  CreatePost,
  GetAllPost,
  GetPost,
  UpdatePost,
  DeletePost,
  SearchPost,
  GetUserPost,
  GetCommunityPost
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

// Get All Post By User
router.get("/profile/:username", GetUserPost);

// Get All Post in Community
router.get("/community/:communityID", GetCommunityPost);

// Update Post
router.put("/:id", UpdatePost);

// Delete Post
router.delete("/:id", DeletePost);

module.exports = router;
