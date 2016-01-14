var mongoose = require('mongoose');

var gameSchema = new mongoose.Schema({
    name: String,
    creator: String,
    participants: [String],
    maxPlayers: Number,
    currentBlackCard: mongoose.Schema.Types.ObjectId,
    currentWhiteCards: [String],
    currentCzar: String,
    currentRound: Number,
    timeLeftFromCurrentRound: Number,
    currentCzarCards:[String],
    currentUserCards: [{
        username: { type: String },
        cards: [String]
    }]
});

var Game = mongoose.model('Game', gameSchema);