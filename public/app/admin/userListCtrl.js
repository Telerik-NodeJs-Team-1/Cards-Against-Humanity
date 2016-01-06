(function() {
    "use strict";

    angular
        .module('app')
        .controller('UserListCtrl', function ($scope, UsersResource) {
        $scope.users = UsersResource.query();
    });
}());