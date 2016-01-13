"use strict";

var express = require('express'),
    router = new express.Router(),
    mongoose = require('mongoose'),
    auth = require('../config/auth'),
    controller = require('../controllers/cards-controller');

function load(app){
    router.get('/create', auth.isAuthenticated, controller.loadCreateCardPage);
    router.get('/mine', auth.isAuthenticated, controller.loadMyCardsPage);
    app.post('/api/cards', controller.createCard);
    app.post('/api/update', controller.updateCardState);
    router.get('/pending', auth.isAuthenticated, auth.isInRole("admin"), controller.loadPendingCardsPage)
}

//app.get('/api/games', controllers.games.getAll);
//router.get('/details/:id', auth.isAuthenticated, controller.getById);
//app.post('/api/games/:id', controllers.games.toggleParticipation);
//app.post('/api/games/:id/cards/czar', controllers.games.registerCzarCards);
//app.post('/api/games/:id/cards/user', controllers.games.registerUserCards);


module.exports = function(app){
    app.use('/cards', router);

    load(app);
};