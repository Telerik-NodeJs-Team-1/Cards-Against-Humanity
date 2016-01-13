(function(){
    "use strict";

    var gameDetailsController = function gameDetailsController($location, $routeParams, identity, games, cards, notifier){
        var vm = this;
        vm.selections = [];

        var gameId = $location.absUrl().split('/').pop();
        games
            .getById(gameId)
            .then(function(resp){
                vm.game = resp.data;
                vm.userWhiteCards = vm.game.currentWhiteCards.slice(0, 4);
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
                                    .registerUserCards(vm.game._id, vm.selections)
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
                .getById(gameId)
                .then(function(resp){
                    vm.game = resp.data;
                    vm.userWhiteCards = vm.game.currentWhiteCards.slice(0, 4);
                    if(Number($seconds.text()) === 0){
                        // reset UI - white cards
                        vm.selections = [];
                        $('.white-card-container').each(function(index, value){
                           $(value).removeClass('selected-white-card');
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