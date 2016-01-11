var mongoose = require('mongoose');
var blackCardSchema = new mongoose.Schema({
    value: String,
    whiteCardsRequire: Number
});

var BlackCard = mongoose.model('BlackCard', blackCardSchema);

module.exports.seedInitialBlackCards = function() {
    BlackCard.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find cards: ' + err);
            return;
        }

        if (collection.length === 0) {
            BlackCard.create({value: 'TSA guidelines now prohibit __________ on airplanes.', whiteCardsRequire: 1});
            BlackCard.create({value: 'It\'s a pity that kids these days are all getting involved with __________.', whiteCardsRequire: 1});
            BlackCard.create({value: 'In 1,000 years, when paper money is but a distant memory, __________ will be our currency.', whiteCardsRequire: 1});
        }
    });
};