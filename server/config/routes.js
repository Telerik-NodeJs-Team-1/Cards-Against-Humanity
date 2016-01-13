var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function(app) {
    app.get('/api/cards/black/:id', controllers.cards.getBlackCardById);
};