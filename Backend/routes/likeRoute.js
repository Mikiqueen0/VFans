const { LikePost, GetLikeCount } = require("../controllers/LikeController");
const router = require("express").Router();

router.post("/:id", LikePost);
router.get("/likeCount/:id", GetLikeCount);

module.exports = router;
