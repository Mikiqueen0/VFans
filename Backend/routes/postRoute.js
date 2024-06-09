const {
  CreatePost,
  GetAllPost,
  GetPost,
  UpdatePost,
  DeletePost,
  SearchPost,
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

module.exports = router;
