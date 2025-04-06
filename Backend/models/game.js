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
    fullDescription: {
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
    Culture: {
        type: String,
        required: false
    },
    AgeGroup: {
        type: String,
        required: true
    },
    EstimatedDuration: {
        type: String,
        required: false
    },
    numberOfPlayers: {
        type: Number,
        required: true
    },
    averageRating: {
        type: Number,
        required: false
    },
    ratingCount: {
        type: Number,
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