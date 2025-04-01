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
  

  exports.addFriend = async (req, res) => {
    const { id } = req.params;
    const { friendId } = req.body;
  
    try {
      const user = await User.findById(id);
      const friend = await User.findById(friendId);
  
      if (!user || !friend) return res.status(404).json({ message: "User not found" });
  
      if (user.friends.includes(friendId)) {
        return res.status(400).json({ message: "Already friends" });
      }
  
      user.friends.push(friendId);
      await user.save();
  
      res.status(200).json({ message: "Friend added!" });
    } catch (err) {
      res.status(500).json({ message: "Failed to add friend" });
    }
  };
  
