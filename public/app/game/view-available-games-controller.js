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

        vm.joinGame = function(gameId){
            var currentUsername = identity.currentUser.username;
            games
                .joinGame(gameId, currentUsername)
                .then(function(){
                    notifier.success('You successfully joined this game')
                });
        };
    };

    angular
        .module('cardsAgainstHumanity.controllers')
        .controller('ViewAvailableGamesController', ['$location', 'identity', 'games', 'notifier', viewAvailableGamesController]);
}());