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
    pendingCard.status = "Pending";
    pendingCard.byUser = req.user._id;

    if(pendingCard.type != 'black'){
        pendingCard.blankSpaces = null;
    }

    PendingCard.create(pendingCard);

    res.redirect('/cards/mine');
};

var loadCreateCardPage = function(req, res){
    var user = req.user;
    res.render('create-card', {user: user});
    res.end();
};

var loadMyCardsPage = function(req, res){
    PendingCard.find({byUser: req.user._id}).exec(function(err, collection) {
        res.render('my-cards', {cards: collection, user: req.user});
        res.end();
    });
};

var loadPendingCardsPage = function (req, res) {
    PendingCard.find({status: 'Pending'}).exec(function(err, collection){
       res.render('pending-cards', {user: req.user, cards: collection});
        res.end();
    });
};

var updateCardState = function(req, res){
    var info = req.body;

    PendingCard.findOne({_id: info._id}).exec(function(err, card){

        card.status = info.status;
        card.save();

        if(card.type == 'black'){
            BlackCard.create({value: card.text, whiteCardsRequire: card.blankSpaces});
        } else {
            WhiteCard.create({value: card.text});
        }

        loadPendingCardsPage(req, res);
    });
};

module.exports = {
    getBlackCardById: getBlackCardById,
    loadCreateCardPage: loadCreateCardPage,
    createCard: createCard,
    loadMyCardsPage: loadMyCardsPage,
    loadPendingCardsPage: loadPendingCardsPage,
    updateCardState: updateCardState
};