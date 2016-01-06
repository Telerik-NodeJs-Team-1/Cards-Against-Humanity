(function() {
    "use strict";

    angular
        .module('cardsAgainstHumanity.controllers')
        .controller('UserListCtrl', function ($scope, UsersResource) {
        $scope.users = UsersResource.query();
    });
}());