var passport = require('passport');

module.exports = {
    login: function(req, res) {
        var auth = passport.authenticate('local', function(err, user) {
            var errorsMessage = '';

            if(err) {
                errorsMessage += 'Could not fetch user';
            }

            if (!user) {
                errorsMessage += 'Incorrect login data';
            }

            if(errorsMessage.length > 0){
                res.render('home', {
                    errors: errorsMessage
                });

                return;
            }

            req.logIn(user, function(err) {
                if (err) return next(err);
                res.redirect('/home');
            });

            res.end();
        });

        auth(req, res);
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