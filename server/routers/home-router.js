"use strict";

var express = require('express'),
    router = new express.Router(),
    mongoose = require('mongoose'),
    controller = require('../controllers/home-controller')();

router.get('/home', controller.loadHomePage);
router.get('/notfound', controller.loadNotFoundPage);
router.get('/unauthorized', controller.loadUnauthorizedPage);

module.exports = function(app){
    app.use('/', router);
};