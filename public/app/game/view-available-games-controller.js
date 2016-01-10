(function(){
    "use strict";

    var viewAvailableGamesController = function createGameController($location, identity, games, notifier){
        var vm = this;

        if(!identity.isAuthenticated()){
            $location.path('/unauthorized');
        }

        games
            .getAllGames()
            .then(function(resp){
                vm.games = resp.data;
            }, function(){
                notifier.error('Unable to create game');
            });
    };

    angular
        .module('cardsAgainstHumanity.controllers')
        .controller('ViewAvailableGamesController', ['$location', 'identity', 'games', 'notifier', viewAvailableGamesController]);
}());