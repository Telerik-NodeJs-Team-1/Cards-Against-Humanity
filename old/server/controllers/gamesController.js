'use strict';

var Game = require('mongoose').model('Game');

var createGame = function createGame(req, res){
    var newGame = req.body;

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

module.exports = {
    create: createGame,
    getAll: getAllGames
};