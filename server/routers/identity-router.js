"use strict";

var express = require('express'),
    router = new express.Router(),
    mongoose = require('mongoose'),
    controller = require('../controllers/users-controller'),
    auth = require('../config/auth');

router.post('/login', auth.login);
router.post('/logout', auth.logout);
router.get('/signup', controller.showRegisterForm);
router.post('/users', controller.createUser);
router.get('/users', auth.isInRole('admin'), controller.getAllUsers);
router.put('/users', auth.isAuthenticated, controller.updateUser);
router.get('/profile', auth.isAuthenticated, controller.showProfile);

module.exports = function(app){
    app.use('/identity', router);
};