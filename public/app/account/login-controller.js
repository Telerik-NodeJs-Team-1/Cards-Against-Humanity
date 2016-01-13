(function(){
    "use strict";

    var loginController = function loginController($scope, $location, notifier, identity, auth) {
        $scope.identity = identity;

        $scope.login = function(user) {
            auth.login(user)
                .then(function(success) {
                    if (success) {
                        notifier.success('Successful login!');
                    }
                    else {
                        notifier.error('Username/Password combination is not valid!');
                    }
                });
        };

        $scope.logout = function() {
            auth.logout()
                .then(function() {
                    notifier.success('Successful logout!');
                });
        }
    };

    angular
        .module('cardsAgainstHumanity.controllers')
        .controller('LoginController', loginController);
}());