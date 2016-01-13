"use strict";

var express = require('express'),
    router = new express.Router(),
    mongoose = require('mongoose'),
    auth = require('../config/auth'),
    controller = require('../controllers/games-controller')();

router.get('/available', auth.isAuthenticated, controller.getAvailableGamesForCurrentUser);
router.get('/create', auth.isAuthenticated, controller.loadCreateGamePage);
//app.post('/api/games', controllers.games.create);
router.get('/:id', auth.isAuthenticated, controller.getById);
router.get('/details/:id', auth.isAuthenticated, controller.loadDetailsForGame);
router.post('/games/:id', auth.isAuthenticated, controller.joinGame);
//app.post('/api/games/:id/cards/czar', controllers.games.registerCzarCards);
//app.post('/api/games/:id/cards/user', controllers.games.registerUserCards);


module.exports = function(app){
    app.use('/games', router);
};