"use strict";

module.exports = function(){
    var controller = {
        loadHomePage: function(req, res){
              var user = req.user;
              res.render('home', {user: user});
              res.end();
        },

        loadNotFoundPage: function(req, res){
            var user = req.user;
            res.render('not-found', {user: user});
            res.end();
        },


        loadUnauthorizedPage: function(req, res){
            res.render('unauthorized', {});
            res.end();
        }
    };

    return controller;
};