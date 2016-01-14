"use strict";

var express = require('express'),
    router = new express.Router(),
    mongoose = require('mongoose'),
    auth = require('../config/auth'),
    controller = require('../controllers/cards-controller');
var paginate = require('express-paginate');

function load(app){
    router.get('/create', auth.isAuthenticated, controller.loadCreateCardPage);
    router.get('/mine', auth.isAuthenticated, controller.loadMyCardsPage);
    app.post('/api/cards', controller.createCard);
    app.post('/api/update', controller.updateCardState);
    router.get('/pending/:page?', auth.isAuthenticated, auth.isInRole("admin"), controller.loadPendingCardsPage)
}

module.exports = function(app){
    app.use(paginate.middleware(10, 50));
    app.use('/cards', router);

    load(app);
};