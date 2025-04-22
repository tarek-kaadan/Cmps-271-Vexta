const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { getAllUsers, addFriend, getFriends, removeFriend, savePreferences, uploadProfilePicture, toggleBookmark, getBookmarks, getPublicProfile } = require("../controllers/userController");

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) =>
      cb(null, `${Date.now()}-${file.originalname}`),
  });
  const upload = multer({ storage });

router.get("/", getAllUsers);
router.get("/:id/friends", getFriends);
router.get("/:userId/bookmarks", getBookmarks);
router.get("/:userId/profile", getPublicProfile);
router.post("/:userId/add-friend", addFriend);
router.post("/:userId/remove-friend", removeFriend);
router.post("/preferences", savePreferences);
router.post("/:id/upload-profile-picture", upload.single("profilePicture"), uploadProfilePicture);
router.post("/:userId/bookmark", toggleBookmark);

module.exports = router;
