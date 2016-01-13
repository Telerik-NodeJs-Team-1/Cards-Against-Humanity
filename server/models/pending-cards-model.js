var mongoose = require('mongoose');
var pendingCardSchema = new mongoose.Schema({
    type: String,
    value: String,
    blankSpaces: Number
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