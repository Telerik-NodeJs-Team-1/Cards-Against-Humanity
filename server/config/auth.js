var passport = require('passport');

module.exports = {
    login: function(req, res, next) {
        var auth = passport.authenticate('local', function(err, user) {
            if (err) return next(err);
            if (!user) {
                res.send({success: false});
            }

            req.logIn(user, function(err) {
                if (err) return next(err);
                res.redirect('/home');
            });

            res.end();
        });

        auth(req, res, next);
    },
    logout: function(req, res, next) {
        req.logout();
        res.redirect('/home');
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