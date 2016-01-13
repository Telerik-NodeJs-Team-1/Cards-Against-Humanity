(function(){
    "use strict";

    var gameDetailsController = function gameDetailsController($location, $routeParams, identity, games, cards, notifier){
        var vm = this;
        vm.selections = [];

        if(!identity.isAuthenticated()){
            $location.path('/unauthorized');
            return;
        }

        vm.leaveGame = function(gameId){
            clearInterval(updateState);
          games
              .leaveGame(gameId, identity.currentUser.username)
              .then(function(){
                  notifier.success('You left the game successfully');
              });
        };

        games
            .getById($routeParams.id)
            .then(function(resp){
                vm.game = resp.data;
                vm.isCzar = vm.game.currentCzar === identity.currentUser.username;
                vm.currentUserIndex = vm.game.participants.indexOf(identity.currentUser.username);
                vm.userWhiteCards = vm.game.currentWhiteCards.slice(vm.currentUserIndex * 4, 4);
            });

        $('.noselect').on('click', function(event){
            var $target = $(event.target);
            if($target.hasClass('white-card-container')) {
                if ($target.hasClass('selected-white-card')) {
                    notifier.error('You cannot unselect a card');
                } else {
                    if (vm.selections.length < vm.blackCard.whiteCardsRequire) {
                        vm.selections.push($target.text());
                        $target.toggleClass('selected-white-card');
                        if (vm.selections.length === vm.blackCard.whiteCardsRequire) {
                            if (vm.isCzar) {
                                games
                                    .registerCzarCards(vm.game._id, vm.selections)
                                    .then(function () {
                                        notifier.success('Your choice has been submitted');
                                    });
                            } else {
                                games
                                    .registerUserCards(vm.game._id, identity.currentUser.username, vm.selections)
                                    .then(function () {
                                        notifier.success('Your choice has been submitted');
                                    });
                            }
                        }
                    } else {
                        notifier.error('You cannot select any more white cards');
                    }
                }
            }
        });

        var $seconds = $('.seconds');
        var updateState = setInterval(function(){
            games
                .getById($routeParams.id)
                .then(function(resp){
                    vm.game = resp.data;
                    vm.currentUserIndex = vm.game.participants.indexOf(identity.currentUser.username);
                    vm.userWhiteCards = vm.game.currentWhiteCards.slice(vm.currentUserIndex * 4, vm.currentUserIndex * 4 + 4);
                    console.log(vm.userWhiteCards);
                    console.log(vm.game.currentWhiteCards);
                    if(Number($seconds.text()) === 0){
                        // reset UI - white cards
                        $('.white-card-container').each(function(index, value){
                           $(value).removeClass('.selected-white-card');
                        });
                    }
                })
                .then(function() {
                    cards
                        .getBlackCardById(vm.game.currentBlackCard)
                        .then(function (resp) {
                            vm.blackCard = resp.data;
                        });
                });
        }, 1000);
    };

    angular
        .module('cardsAgainstHumanity.controllers')
        .controller('GameDetailsPageController', ['$location','$routeParams', 'identity', 'games', 'cards', 'notifier', gameDetailsController]);
}());