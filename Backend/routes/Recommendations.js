const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const User = require("../models/User");
const Game = require("../models/game");

router.get("/:userId", verifyToken, async (req, res) => {
    try {
        if(req.user.id != req.params.userId) {
            return res.status(403).json("You have to be logged in to access your recommendations");
        }

        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const recommendedGames = await Game.find({
            category: {$in: user.preferences },
        });
        
        res.json(recommendedGames);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;