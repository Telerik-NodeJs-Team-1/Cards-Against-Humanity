(function() {
    "use strict";

    angular
        .module('cardsAgainstHumanity.controllers')
        .controller('SignUpCtrl', function ($scope, $location, auth, notifier) {
        $scope.signup = function (user) {
            auth.signup(user).then(function () {
                notifier.success('Registration successful!');
                $location.path('/');
            })
        }
    });
}());