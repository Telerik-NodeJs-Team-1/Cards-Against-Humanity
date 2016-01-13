(function(){
    "use strict";

    var cardsController = function loginController() {
        var vm = this;
        vm.meow = 'MEOWWWWWWW';
    };

    angular
        .module('cardsAgainstHumanity.controllers')
        .controller('CardsController', [cardsController]);
}());