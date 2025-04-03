const express = require('express');
const router = express.Router();
const games = require('../models/game');

function insertPostData () {
    games.insertMany([
        {
            title: "Cyberpunk 2077",
            description: "V is the best",
            category: "Open World",
            OriginCountry: "Poland",
            numberOfPlayers: 20000
        },
        {
            title: "grand theft auto 6",
            description: "Best of the century",
            category: "Open World",
            OriginCountry: "United States",
            numberOfPlayers: 2000000
        },
        {
            title: "Crusader Kings 3",
            description: "Mediavel Ages are mee",
            category: "Strategy",
            OriginCountry: "Sweden",
            numberOfPlayers: 1340
        }
    ])
}
insertPostData();

router.get('/', async (req, res) => {
    const allGames= await games.find();
    res.json(allGames);
})

module.exports = router;