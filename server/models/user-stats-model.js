var mongoose = require('mongoose');

var userStatsSchema = mongoose.Schema({
    username: { type: String, require: '{PATH} is required', unique: true },
    startedGames: Number,
    endedGames: Number
});

var UserStat = mongoose.model('UserStat', userStatsSchema);

module.exports.getUserStats = function() {
    UserStat.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find users: ' + err);
            return;
        }

        console.log('Active users:', collection.length);
    });
};