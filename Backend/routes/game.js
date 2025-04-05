const express = require('express');
const router = express.Router();
const Game = require('../models/game');

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
    const allGames= await games.find();
    res.json(allGames);
})

module.exports = router;