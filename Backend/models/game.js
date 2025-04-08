const mongoose = require('mongoose');
const { moduleRunnerTransform } = require('vite');

const Schema = mongoose.Schema;
const games = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    OriginCountry: {
        type: String,
        required: true
    },
    numberOfPlayers: {
        type: Number,
        required: true
    },
    culture: {
        type: String,
        required: false
    },
    averageRating: {
        type: Number,
        required: false
    },
    ratingCount: {
        type: Number,
        required: false
    },
    ageGroup: {
        type: String,
        required: true
    },
    estimatedDuration: {
        type: String,
        required: false
    },
    culturalContext: {
        type: String,
        required: false
    },
    fullDescription: {
        type: String,
        required: true
    },
    overlayImage: {
        type: String,
        required: true
    },
    sliderImage: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Games', games);