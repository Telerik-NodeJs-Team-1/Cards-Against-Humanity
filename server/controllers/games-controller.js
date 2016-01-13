"use strict";

var mongoose = require('mongoose'),
    Game = mongoose.model('Game'),
    User = mongoose.model('User'),
    BlackCard = mongoose.model('BlackCard'),
    WhiteCard = mongoose.model('WhiteCard'),
    auth = require('../config/auth');

var createGame = function createGame(req, res){
    var newGame = req.body;
    newGame.currentRound = 1;
    newGame.timeLeftFromCurrentRound = 120;
    newGame.currentCzar = newGame.creator;
    newGame.currentCzarCards = [];
    newGame.currentUserCards = [];
    newGame.participants = [newGame.creator];

    BlackCard.find({}, function(error, blackCards){
        if(error){
            res.status(304);
            res.end();
            return;
        }

        var randomIndex = Math.floor(Math.random() * blackCards.length);
        newGame.currentBlackCard = blackCards[randomIndex]._id;

        WhiteCard.find({}, function(error, whiteCards){
            if(error){
                res.status(304);
                res.end();
                return;
            }

            var whiteCardsCopy = whiteCards.slice(0);
            newGame.currentWhiteCards = whiteCards
                .sort(function(){
                    return 0.5 - Math.random();
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

var joinGame = function(req, res){
    var gameId = req.params.id;
    Game.findById(gameId, function(error, game){
       game.participants.push(req.params.username);
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

var getAvailableGamesForCurrentUser = function(req, res, next){
    Game.find({}, function(error, games){
        if(error){
            res.status(304);
            res.end();
            return;
        }

        var availableGames = [];
        for (var i = 0; i < games.length; i += 1) {
            var currentGame = games[i];
            if (currentGame.creator === req.user.username) {
                continue;
            }

            availableGames.push(currentGame);
        }

        res.render('available-games', {
            user: req.user,
            data: availableGames
        });

        res.end();
    });
};

var loadDetailsForGame = function loadDetailsForGame(req, res){
    Game.findById(req.params.id, function(error, game){
        var user = req.user;
        res.render('game-details', {
            user: user
        });

        res.end();
    });
};

var getById = function getById(req, res){
    Game.findById(req.params.id, function(error, game){
        var user = req.user;
        res.send(JSON.stringify(game));
        res.end();
    });
};

var registerCzarCards = function registerCzarCards(req, res){
    Game.findById(req.params.id, function(error, game){
        if(error){
            res.status(304);
            res.end();
            return;
        }

        game.currentCzarCards = req.body.cards;
        game.save();

        res.status(201);
        res.end();
    });
};

var registerUserCards= function registerUserCards(req, res){
    Game.findById(req.params.id, function(error, game){
        if(error){
            res.status(304);
            res.end();
            return;
        }

        var userCards = {
            username: req.body.username,
            cards: req.body.cards
        };
        console.log(userCards);
        game.currentUserCards.push(userCards);

        game.save();

        res.status(201);
        res.end();
    });
};

var checkCzarCardsAgainstUserCards = function checkCzarCardsAgainstUserCards(czar, user){
    for(var i = 0; i < user.length; i += 1){
        var currentCards = user[i].cards;
        var winner = user[i].username;
        var isWinner = true;
        for(var j = 0; j < currentCards.length; j += 1){
            var currentCard = currentCards[j];

            if(czar.indexOf(currentCard) < 0){
                isWinner = false;
                winner = null;
            }
        }

        if(isWinner && winner){
            User.findOne({username: winner}, function(error, user){
                user.points = user.points + 1;
                user.save();
            });
        }
    }
};

var loadCreateGamePage = function(req, res){
    var user = req.user;
    res.render('create-game', {user: user});
    res.end();
};

setInterval(function(){
    Game.find({}, function(error, games){
        if(error){
            console.log('Games update fail...');
        } else {
            games.forEach(function(elem){
                if(elem.participants.length > 1) {
                    if (elem.timeLeftFromCurrentRound > 0) {
                        elem.timeLeftFromCurrentRound = Number(elem.timeLeftFromCurrentRound) - 1;
                        elem.save();
                    } else {
                        BlackCard.find({}, function (error, blackCards) {
                            elem.timeLeftFromCurrentRound = 120;
                            elem.currentRound = Number(elem.currentRound) + 1;

                            var randomIndex = Math.floor(Math.random() * blackCards.length);
                            elem.currentBlackCard = blackCards[randomIndex]._id;

                            WhiteCard.find({}, function (error, whiteCards) {
                                var whiteCardsCopy = whiteCards.slice(0);
                                elem.currentWhiteCards = whiteCards
                                    .sort(function () {
                                        return 0.5 - Math.random();
                                    })
                                    .slice(0, 4 * elem.participants.length)
                                    .map(function (card) {
                                        return card.value;
                                    });

                                checkCzarCardsAgainstUserCards(elem.currentCzarCards, elem. currentUserCards);

                                elem.currentCzarCards = [];
                                elem.currentUserCards = [];

                                elem.save();
                            });
                        });
                    }
                }
            });

            // console.log('Games update success...');
        }
    });
}, 1000);

module.exports = function(){
    let controller = {
        loadCreateGamePage: loadCreateGamePage,
        loadDetailsForGame: loadDetailsForGame,
        create: createGame,
        getAll: getAllGames,
        getAvailableGamesForCurrentUser: getAvailableGamesForCurrentUser,
        getById: getById,
        joinGame: joinGame,
        registerCzarCards: registerCzarCards,
        registerUserCards: registerUserCards
    };

    return controller;
};