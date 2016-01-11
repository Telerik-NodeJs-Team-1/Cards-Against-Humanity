(function(){
    "use strict";

    var createGameController = function createGameController($location, identity, games, notifier){
        var vm = this;

        if(!identity.isAuthenticated()){
            $location.path('/unauthorized');
            return;
        }

        vm.createNewGame = function createNewGame(game){
            var gameToCreate = game;
            gameToCreate.creator = identity.currentUser.username;
            games
                .createNewGame(game)
                .then(function(){
                    notifier.success('Game created successfully');
                }, function(){
                    notifier.error('Unable to create game');
                });
        }
    };

    angular
        .module('cardsAgainstHumanity.controllers')
        .controller('CreateGameController', ['$location', 'identity', 'games', 'notifier', createGameController]);
}());