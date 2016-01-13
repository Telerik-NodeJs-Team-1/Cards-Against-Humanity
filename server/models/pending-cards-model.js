var mongoose = require('mongoose');
var pendingCardSchema = new mongoose.Schema({
    type: String,
    text: String,
    blankSpaces: Number,
    status: String,
    byUser: String
});

var PendingCard = mongoose.model('PendingCard', pendingCardSchema);

module.exports.getPendingCardCount = function() {
    PendingCard.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find cards: ' + err);
            return;
        }

        console.log('Pending cards:', collection.length);
    });
};