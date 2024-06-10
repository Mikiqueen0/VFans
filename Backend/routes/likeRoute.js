const { LikePost, GetLikeCount, GetUserLikePost } = require("../controllers/LikeController");
const router = require("express").Router();

router.post("/:id", LikePost);
router.get("/likeCount/:id", GetLikeCount);
router.get("/likePost/:username", GetUserLikePost);

module.exports = router;
