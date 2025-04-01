const express = require("express");
const router = express.Router();
const { getAllUsers, addFriend, getFriends } = require("../controllers/userController");

router.get("/", getAllUsers); // ✅ This is the GET /api/users
router.get("/:id/friends", getFriends);
router.post("/add-friend", addFriend);

module.exports = router;
