var mongoose = require('mongoose'),
    user = require('../models/user-model'),
    whiteCard = require('../models/white-card-model'),
    blackCard = require('../models/black-card-model'),
    pendingCard = require('../models/pending-cards-model'),
    game = require('../models/game-model');

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;

    db.once('open', function(err) {
        if (err) {
            console.log('Database could not be opened: ' + err);
            return;
        }

        console.log('Database up and running...')
    });

    db.on('error', function(err){
        console.log('Database error: ' + err);
    });

    user.seedInitialUsers();
    whiteCard.seedInitialWhiteCards();
    blackCard.seedInitialBlackCards();
    pendingCard.getPendingCardCount();
};