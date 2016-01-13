'use strict';

var mongoose = require('mongoose'),
    BlackCard = mongoose.model('BlackCard'),
    WhiteCard = mongoose.model('WhiteCard'),
    PendingCard = mongoose.model('PendingCard');

var getBlackCardById = function(req, res){
  BlackCard.findById(req.params.id, function(error, card){
      if(error){
          res.status(404);
          res.end();
          return;
      }

      res.status(200);
      res.write(JSON.stringify(card));
      res.end();
  });
};

var createCard = function createGame(req, res) {
    var pendingCard = req.body;

    PendingCard.create(pendingCard);

    res.redirect('/');
};

var loadCreateCardPage = function(req, res){
    var user = req.user;
    res.render('create-card', {user: user});
    res.end();
};


module.exports = {
    getBlackCardById: getBlackCardById,
    loadCreateCardPage: loadCreateCardPage,
    createCard: createCard
};