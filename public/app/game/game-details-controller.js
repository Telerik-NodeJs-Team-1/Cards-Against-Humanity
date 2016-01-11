(function(){
    "use strict";

    var gameDetailsController = function gameDetailsController($location, $routeParams, identity, games, notifier){
        var vm = this;

        if(!identity.isAuthenticated()){
            $location.path('/unauthorized');
            return;
        }

        games
            .getById($routeParams.id)
            .then(function(resp){
                vm.game = resp.data;
                vm.blackCard
            });

        var clock = $('.seconds');

        var pesho = setInterval(function(){
            games
                .getById($routeParams.id)
                .then(function(resp){
                    vm.game = resp.data;
                });
        }, 1000);
    };

    angular
        .module('cardsAgainstHumanity.controllers')
        .controller('GameDetailsPageController', ['$location','$routeParams', 'identity', 'games', 'notifier', gameDetailsController]);
}());