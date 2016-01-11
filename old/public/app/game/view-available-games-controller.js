(function(){
    "use strict";

    var viewAvailableGamesController = function createGameController($location, identity, games, notifier){
        var vm = this;

        if(!identity.isAuthenticated()){
            $location.path('/unauthorized');
            return;
        }

        games
            .getAllGames()
            .then(function(resp){
                vm.games = Enumerable
                        .From(resp.data)
                        .Where(function(game){
                            return game.creator !== identity.currentUser.username;
                        })
                        .ToArray();

            }, function(){
                notifier.error('Unable to create game');
            });
    };

    angular
        .module('cardsAgainstHumanity.controllers')
        .controller('ViewAvailableGamesController', ['$location', 'identity', 'games', 'notifier', viewAvailableGamesController]);
}());