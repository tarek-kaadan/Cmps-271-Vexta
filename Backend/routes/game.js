const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

router.post('/', async(req, res) => {
    try {
        const {title,  description, category, OriginCountry, numberOfPlayers } = req.body;

        const newGame = await Game.create({
            title,
            description,
            category,
            OriginCountry,
            numberOfPlayers,
        });
        res.status(201).json(newGame);
    }
    catch (err) {
        console.log(chalk.red("Error inserting game:", err));
        res.status(500).json({ error: "Failed to insert game" });
    }
})

router.get('/', async (req, res) => {
    const allGames= await Game.find();
    res.json(allGames);
})

router.get("/:id", async (req, res) => {
    try {
      const game = await Game.findById(req.params.id);  
      if (!game) {
        return res.status(404).json({ message: "Game not found" });
      }
      res.json(game);  
    } catch (err) {
      console.error("Error fetching game details:", err);
      res.status(500).json({ message: "Server error", error: err });
    }
});

router.patch("/:id", async (req, res) => {
    try {
      const { title, description, category, OriginCountry, numberOfPlayers, averageRating, ratingCount } = req.body;

      const updatedGame = await Game.findByIdAndUpdate(
        req.params.id,
        {
          title,
          description,
          category,
          OriginCountry,
          numberOfPlayers,
          averageRating,
          ratingCount,
        },
        { new: true }  
      );
  
      if (!updatedGame) {
        return res.status(404).json({ message: "Game not found" });
      }
  
      res.json(updatedGame);
    } catch (err) {
      console.error("Error updating game:", err);
      res.status(500).json({ message: "Error updating game", error: err });
    }
  });
  
module.exports = router;