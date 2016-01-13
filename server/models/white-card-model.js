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
            WhiteCard.create({value: 'Being on fire.'});
            WhiteCard.create({value: 'Racism.'});
            WhiteCard.create({value: 'Old people smell.'});
            WhiteCard.create({value: 'Women in yogurt commercials.'});
            WhiteCard.create({value: 'The gays.'});
            WhiteCard.create({value: 'An oversized lollipop.'});
            WhiteCard.create({value: 'African children.'});
            WhiteCard.create({value: 'The hardworking mexican.'});
            WhiteCard.create({value: 'A tiny horse.'});
            WhiteCard.create({value: 'Darth Vader.'});
            WhiteCard.create({value: 'Advice from a wise, old black man.'});
            WhiteCard.create({value: 'Men.'});
            WhiteCard.create({value: 'A box full of secrets.'});

        }
    });
};