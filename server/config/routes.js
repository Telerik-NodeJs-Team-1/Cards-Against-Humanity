var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function(app) {
    app.get('/api/users', auth.isInRole('admin'), controllers.users.getAllUsers);
    app.post('/api/users', controllers.users.createUser);
    app.put('/api/users', auth.isAuthenticated, controllers.users.updateUser);

    app.get('/partials/:partialArea/:partialName', function(req, res) {
        res.render('../../public/app/' + req.params.partialArea + '/' + req.params.partialName)
    });

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    app.post('/api/games', controllers.games.create);
    app.get('/api/games', controllers.games.getAll);
    app.get('/api/games/:id', controllers.games.getById);

    app.get('*', function(req, res) {
        res.render('index', {currentUser: req.user});
    });
};