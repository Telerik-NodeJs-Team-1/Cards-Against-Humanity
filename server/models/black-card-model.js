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
            BlackCard.create({value: 'Why can\'t I sleep at night?', whiteCardsRequire: 1});
            BlackCard.create({value: 'What\'s that smell?', whiteCardsRequire: 1});
            BlackCard.create({value: 'I got 99 problems but_____________ ain\t one.', whiteCardsRequire: 1});
            BlackCard.create({value: 'It\'s a pity that kids these days are all getting involved with_____________.', whiteCardsRequire: 1});
            BlackCard.create({value: 'Alternative medicine is now embracing the curative powers of ___________.', whiteCardsRequire: 1});
            BlackCard.create({value: 'And the Academy Award for___________ goes to___________.', whiteCardsRequire: 2});
        }
    });
};