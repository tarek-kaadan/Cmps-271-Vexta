const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find({}, "email _id"); // Return email and _id
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  };

  exports.getFriends = async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate("friends", "email");
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.status(200).json(user.friends);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch friends" });
    }
  };  
  

// controllers/userController.js
exports.addFriend = async (req, res) => {
  const { userId } = req.params;
  const { friendId } = req.body;

  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User or friend not found" });
    }

    if (!user.friends.includes(friendId)) {
      user.friends.push(friendId);
      await user.save();
    }

    res.status(200).json({ message: "Friend added successfully", user });
  } catch (error) {
    console.error("Add friend error:", error);
    res.status(500).json({ message: "Server error while adding friend" });
  }
};  
  
exports.removeFriend = async (req, res) => {
  const { userId } = req.params;
  const { friendId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.friends = user.friends.filter(id => id.toString() !== friendId);
    await user.save();

    res.status(200).json({ message: "Friend removed successfully", user });
  } catch (error) {
    console.error("Remove friend error:", error);
    res.status(500).json({ message: "Server error while removing friend" });
  }
};
