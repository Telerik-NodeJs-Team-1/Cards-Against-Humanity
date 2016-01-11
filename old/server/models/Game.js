var mongoose = require('mongoose');

var gameSchema = new mongoose.Schema({
    name: String,
    creator: String,
    participants: [String],
    currentBlackCard: String,
    currentWhiteCards: [String],
    currentCzar: String,
    currentRound: Number
});

var Game = mongoose.model('Game', gameSchema);