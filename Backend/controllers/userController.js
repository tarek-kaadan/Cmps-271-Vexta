const User = require("../models/User");
const Game = require("../models/game");

exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find({}, "username _id");
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  };

  exports.getFriends = async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate("friends", "username email");
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.status(200).json(user.friends);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch friends" });
    }
  };  
  

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

exports.savePreferences = async (req, res) => {
  const { userId, categories } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.preferences = categories;
    await user.save();

    res.status(200).json({ message: "Preferences saved" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.uploadProfilePicture = async (req, res) => {
  try {
    const userId = req.params.id;
    const imagePath = `uploads/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      userId,
      { profilePicture: imagePath },
      { new: true }
    );

    res.status(200).json({
      message: "Profile updated",
      profilePicture: imagePath,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Upload failed" });
  }
};

exports.toggleBookmark = async (req, res) => {
  const { userId } = req.params;
  const { gameId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const index = user.bookmarkedGames.indexOf(gameId);
    if (index > -1) {
      user.bookmarkedGames.splice(index, 1); // remove
    } else {
      const game = await Game.findById(gameId);
      if (!game) return res.status(404).json({ message: "Game not found" });
      user.bookmarkedGames.push(gameId); // add
    }

    await user.save();
    res.status(200).json({ message: "Bookmark updated", bookmarks: user.bookmarkedGames });
  } catch (err) {
    res.status(500).json({ message: "Error updating bookmarks", error: err });
  }
};

exports.getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("bookmarkedGames");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.bookmarkedGames);
  } catch (err) {
    console.error("🔥 getBookmarks error:", err);
    res.status(500).json({ message: "Error fetching bookmarks", error: err.message });
  }
};