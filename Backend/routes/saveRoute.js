const { SavePost, GetAllSave, GetUserSavePost } = require("../controllers/SaveController");
const router = require("express").Router();

router.post("/:id", SavePost);
router.get("/save/:id", GetAllSave);
router.get("/allSavePost/:username", GetUserSavePost);

module.exports = router;
