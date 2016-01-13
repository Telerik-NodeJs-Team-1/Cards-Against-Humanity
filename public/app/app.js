(function() {
    "use strict";
    angular.module('cardsAgainstHumanity.services', []);
    angular.module('cardsAgainstHumanity.controllers', ['cardsAgainstHumanity.services']);
    angular.module('cardsAgainstHumanity', ['ngResource', 'ngRoute', 'cardsAgainstHumanity.controllers'])
        .value('toastr', toastr)
}());