'use strict';

var mongoose = require('mongoose'),
    Game = mongoose.model('Game'),
    BlackCard = mongoose.model('BlackCard'),
    WhiteCard = mongoose.model('WhiteCard');

var numberGenerator = function(){
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
};

var guidGenerator = function(){
    return numberGenerator() + numberGenerator() + '-' + numberGenerator() + '-' + numberGenerator() + '-' +
        numberGenerator() + '-' + numberGenerator() + numberGenerator() + numberGenerator();
};

var createGame = function createGame(req, res){
    var newGame = req.body;
    newGame.currentRound = 1;
    newGame.timeLeftFromCurrentRound = 120;

    BlackCard.find({}, function(error, blackCards){
        if(error){
            res.status(304);
            res.end();
            return;
        }

        var randomIndex = Math.floor(Math.random() * blackCards.length);
        newGame.currentBlackCard = blackCards[randomIndex].value;

        WhiteCard.find({}, function(error, whiteCards){
            if(error){
                res.status(304);
                res.end();
                return;
            }

            var whiteCardsCopy = whiteCards.slice(0);
            newGame.currentWhiteCards = whiteCards
                .sort(function(){
                    return guidGenerator();
                })
                .slice(0,10)
                .map(function(card){
                    return card.value;
                });

            Game.create(newGame, function(error, game){
                if(error){
                    res.status(304);
                    res.end();
                    return;
                }

                res.status(201);
                res.write(JSON.stringify(game));
                res.end();
            })
        });
    });
};

var getAllGames = function getAllGames(req, res){
    Game.find({}, function(error, games){
        if(error){
            res.status(304);
            res.end();
            return;
        }

        res.status(200);
        res.write(JSON.stringify(games));
        res.end();
    });
};

var getById = function getById(req, res){
    Game.findById(req.params.id, function(error, game){
        if(error){
            res.status(404);
            res.end();
            return;
        }

        res.status(200);
        res.write(JSON.stringify(game));
        res.end();
    });
};

setInterval(function(){
    Game.find({}, function(error, games){
        if(error){
            console.log('Games update fail...');
        } else {
            games.forEach(function(elem){
                if(elem.timeLeftFromCurrentRound > 0) {
                    elem.timeLeftFromCurrentRound = Number(elem.timeLeftFromCurrentRound) - 1;
                    elem.save();
                } else {
                    BlackCard.find({}, function(error, blackCards){
                        elem.timeLeftFromCurrentRound = 120;
                        elem.currentRound = Number(elem.currentRound) + 1;

                        var randomIndex = Math.floor(Math.random() * blackCards.length);
                        elem.currentBlackCard = blackCards[randomIndex].value;

                        WhiteCard.find({}, function(error, whiteCards){
                            var whiteCardsCopy = whiteCards.slice(0);
                            elem.currentWhiteCards = whiteCards
                                .sort(function(){
                                    return guidGenerator();
                                })
                                .slice(0,10)
                                .map(function(card){
                                    return card.value;
                                });

                            elem.save();
                        });
                    });
                }
            });

            console.log('Games update success...');
        }
    });
}, 1000);

module.exports = {
    create: createGame,
    getAll: getAllGames,
    getById: getById
};