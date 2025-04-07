const express = require('express');
const router = express.Router();
const Game = require('../models/game');

/*function insertPostData () {
  games.insertMany([
      {
          title: "Cyberpunk 2077",
          description: "V is the best",
          category: "Open World",
          OriginCountry: "Poland",
          numberOfPlayers: 20000

      },
  ])
}*/

//insertPostData();


router.get('/', async (req, res) => {
    const allGames= await Game.find();
    res.json(allGames);
})

router.get('/AllGames', async (req, res) => {
  const search = req.query.search || '';
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;

  try {
    const query = {
      title: { $regex: search, $options: 'i' } 
    };

    const games = await Game.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Game.countDocuments(query);

    res.json({
      games,
      currentPage: page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/title/:title', async (req, res) => {
  try {
    const { title } = req.params; 
    const game = await Game.findOne({ title: title }); 

    if (!game) {
      return res.status(404).json({ message: "Game not found" }); 
    }

    res.json(game); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" }); 
  }
});


router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id); 
    if (!game) return res.status(404).json({ message: "Game not found" });
    res.json(game); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


  
module.exports = router;