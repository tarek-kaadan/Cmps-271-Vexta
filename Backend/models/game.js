const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  country: { type: String, required: true },
  releaseDate: { type: Date },
  rating: { type: Number, min: 0, max: 10 },
}, { timestamps: true });

module.exports = mongoose.model("Game", GameSchema);
