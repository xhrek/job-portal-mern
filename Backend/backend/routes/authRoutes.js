const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  registerUser,
  loginUser,
  getProfile,
  uploadResume
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post(
  "/upload-resume/:userId",
  upload.single("resume"),
  uploadResume
);

router.get(
  "/profile",
  authMiddleware,
  getProfile
);

module.exports = router;