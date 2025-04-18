const express = require("express");
const router = express.Router();
const { getAllUsers, addFriend, getFriends, removeFriend, savePreferences } = require("../controllers/userController");

router.get("/", getAllUsers);
router.get("/:id/friends", getFriends);
// router.post("/add-friend", addFriend);
router.post("/:userId/add-friend", addFriend);
router.post("/:userId/remove-friend", removeFriend);
router.post("/preferences", savePreferences);

module.exports = router;
