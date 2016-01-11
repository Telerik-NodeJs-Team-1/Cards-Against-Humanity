var mongoose = require('mongoose');
var whiteCardSchema = new mongoose.Schema({
    value: String
});

var WhiteCard = mongoose.model('WhiteCard', whiteCardSchema);

module.exports.seedInitialWhiteCards = function() {
    WhiteCard.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find cards: ' + err);
            return;
        }

        if (collection.length === 0) {
            WhiteCard.create({value: 'A Gypsy curse.'});
            WhiteCard.create({value: 'A moment of silence.'});
            WhiteCard.create({value: 'A sausage festival.'});
        }
    });
};