"use strict";

var express = require('express'),
    router = new express.Router(),
    mongoose = require('mongoose'),
    auth = require('../config/auth'),
    controller = require('../controllers/games-controller')();

router.get('/available', auth.isAuthenticated, controller.getAvailableGamesForCurrentUser);
router.get('/create', auth.isAuthenticated, controller.loadCreateGamePage);
router.get('/started', auth.isAuthenticated, controller.loadStartedGames);
router.post('/create', controller.createGame);
router.get('/:id', auth.isAuthenticated, controller.getById);
router.get('/details/:id', auth.isAuthenticated, controller.loadDetailsForGame);
router.post('/:id', auth.isAuthenticated, controller.joinGame);
router.post('/:id/cards/czar', controller.registerCzarCards);
router.post('/:id/cards/user', controller.registerUserCards);
router.post('/:id/leave', auth.isAuthenticated, controller.leaveGame);


module.exports = function(app){
    app.use('/games', router);
};