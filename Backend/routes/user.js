const express = require("express");
const router = express.Router();
const { getAllUsers, addFriend, getFriends, removeFriend } = require("../controllers/userController");

router.get("/", getAllUsers); // ✅ This is the GET /api/users
router.get("/:id/friends", getFriends);
// router.post("/add-friend", addFriend);
router.post("/:userId/add-friend", addFriend);
router.post("/:userId/remove-friend", removeFriend);

module.exports = router;
