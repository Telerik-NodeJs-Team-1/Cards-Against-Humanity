"use strict";

var passport = require('passport');
require('../../public/lib/jquery/dist/jquery.min');
require('../../public/lib/toastr/toastr.min');

module.exports = {
    login: function(req, res, next) {
        var auth = passport.authenticate('local', function(err, user) {
            if (err) return next(err);
            if (!user) {
                res.send({success: false});
            }

            req.logIn(user, function(err) {
                if (err) return next(err);
                notifier.success('You are now logged in');
                res.redirect('/home');
                res.send({success: true});
                res.end();
            });

            res.end();
        });

        auth(req, res, next);
    },
    logout: function(req, res, next) {
        req.logout();
        res.redirect('/home');
        res.end();
    },
    isAuthenticated: function(req, res, next) {
        if (!req.isAuthenticated()) {
            res.status(403);
            res.redirect('/unauthorized');
            res.end();
        }
        else {
            next();
        }
    },
    isInRole: function(role) {
        return function(req, res, next) {
            if (req.isAuthenticated() && req.user.roles.indexOf(role) > -1) {
                next();
            }
            else {
                res.redirect('/unauthorized');
                res.end();
            }
        }
    }
};