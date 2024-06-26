const {
  CreatePost,
  GetAllPost,
  GetPost,
  UpdatePost,
  DeletePost,
  SearchPost,
  GetUserPost,
  GetCommunityPost,
  GetAllJoinedCommunity,
  PostComment,
  GetPostComment,
  GetPostCommentNumber
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
router.get("/user/:username", GetUserPost);

// Get All Post in Community
router.get("/community/:communityID", GetCommunityPost);

// Get All Post from joined community
router.get("/user/community/:userID", GetAllJoinedCommunity);

// Update Post
router.put("/:id", UpdatePost);

// Delete Post
router.delete("/:postID", DeletePost);

// Post comment
router.post("/comment", PostComment);

// Get post comment
router.get("/comment/:postID", GetPostComment);

// Get post comment
router.get("/commentCount/:postID", GetPostCommentNumber);

module.exports = router;
