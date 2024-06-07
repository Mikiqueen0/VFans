const { Signup, Login, Profile } = require("../Controllers/AuthController");
const { userVerification } = require("../middlewares/AuthMiddleware");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/verify", userVerification);
router.get("/profile/:id", Profile);

module.exports = router;
