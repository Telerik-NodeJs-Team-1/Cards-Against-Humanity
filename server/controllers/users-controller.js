"use strict";

var encryption = require('../utilities/encryption');
var User = require('mongoose').model('User'),
    UserStats = require('mongoose').model('UserStat');

module.exports = function() {
    var controller = {
        showRegisterForm: function(req, res){
            if(req.user){
                res.redirect('/');
                res.end();
                return;
            }

            res.render('sign-up', {});
            res.end();
        },

        showProfile: function(req, res){
            var user = req.user;
            res.render('profile', {user: user});
            res.end();
        },

        createUser: function(req, res, next) {
            var errorsMessage = '';
            var newUserData = req.body;

            if(newUserData.password.length < 6){
                errorsMessage += 'Password is required and must be at least 6 symbols.';
            }

            if(newUserData.username.length < 6){
                errorsMessage += 'Username is required and must be at least 6 symbols.';
            }

            if(newUserData.firstName < 1){
                errorsMessage += 'First name is required.';
            }

            if(newUserData.lastName < 1){
                errorsMessage += 'Last name is required.';
            }

            if(errorsMessage.length > 0) {
                res.render('sign-up', {
                    user: req.user,
                    errors: errorsMessage
                });

                return;
            }

            newUserData.salt = encryption.generateSalt();
            newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
            newUserData.points = 0;
            newUserData.roles = ["admin", "standard"];
            User.create(newUserData, function(err, user) {
                if (err) {
                    console.log('Failed to register new user: ' + err);
                    return;
                }

                req.logIn(user, function(err) {
                    if (err) {
                        res.status(400);
                        return res.send({reason: err.toString()});
                    }

                    res.redirect('/');
                })
            });
        },
        updateUser: function(req, res, next) {
            if (req.user._id == req.body._id || req.user.roles.indexOf('admin') > -1) {
                var updatedUserData = req.body;
                if (updatedUserData.password && updatedUserData.password.length > 0) {
                    updatedUserData.salt = encryption.generateSalt();
                    updatedUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
                }

                User.update({_id: req.body._id}, updatedUserData, function() {
                    res.end();
                })
            }
            else {
                res.send({reason: 'You do not have permissions!'})
            }
        },
        getAllUsers: function(req, res) {
            User.find({}).exec(function(err, collection) {
                if (err) {
                    console.log('Users could not be loaded: ' + err);
                }

                res.render('all-users', {
                    user: req.user,
                    users: collection
                });
            })
        },
        getStats: function(req, res){
            UserStats.find({username: req.user.username}).exec(function(err, stats){
               res.send(stats);
            });
        }
    };

    return controller;
};