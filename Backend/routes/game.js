const express = require('express');
const router = express.Router();
const Game = require('../models/game');
const fs = require("fs");
const path = require("path");

async function addSliderImageToGamesWithoutIt() {
  const games = await Game.find({ sliderImage: { $exists: false } });
  let updated = 0;

  for (let game of games) {
    if (!game.title) {
      console.log(`⚠️ Skipping game with missing title (ID: ${game._id})`);
      continue;
    }

    const fileName = `${game.title}.png`;
    const imagePath = path.join(__dirname, "..", "..", "front-end", "public", "images", fileName);
    const sliderPath = `/images/${fileName}`;

    if (fs.existsSync(imagePath)) {
      game.sliderImage = sliderPath;
      await game.save();
      updated++;
      console.log(`✅ Added sliderImage for "${game.title}" → ${sliderPath}`);
    } else {
      console.log(`❌ No image found for "${game.title}"`);
    }
  }

  console.log(`🎉 Done! Added sliderImage to ${updated} game(s).`);
  return updated;
}


router.get('/', async (req, res) => {
  const allGames = await Game.find();
  res.json(allGames);
});

router.get('/AllGames', async (req, res) => {
  const search = req.query.search || '';
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;

  try {
    const query = {
      title: { $regex: search, $options: 'i' },
    };

    const games = await Game.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Game.countDocuments(query);

    res.json({
      games,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get("/update-slider-images", async (req, res) => {
  try {
    const count = await addSliderImageToGamesWithoutIt();
    res.json({ message: `Updated ${count} games with sliderImage.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update slider images." });
  }
});

router.get('/title/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const game = await Game.findOne({ title: title });

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    res.json(game);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.json(game);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post("/", async (req, res) => {
  try {
    const newGame = new Game(req.body);
    await newGame.save();
    res.status(201).json({ message: "Game added successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error adding game", error: err });
  }
});

module.exports = router;
