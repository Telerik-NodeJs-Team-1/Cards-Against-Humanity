(function() {
    "use strict";

    var authService = function authService($http, $q, identity, UsersResource) {
        var signUp = function signUp(newUser){
            var deferred = $q.defer();

            var user = new UsersResource(newUser);
            user.$save().then(function () {
                identity.currentUser = user;
                deferred.resolve();
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        var update = function update(user){
            var deferred = $q.defer();

            var updatedUser = new UsersResource(user);
            updatedUser._id = identity.currentUser._id;
            updatedUser.$update().then(function () {
                identity.currentUser.firstName = updatedUser.firstName;
                identity.currentUser.lastName = updatedUser.lastName;
                deferred.resolve();
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        var login = function login(user){
            var deferred = $q.defer();

            $http.post('/login', user).success(function (response) {
                if (response.success) {
                    var user = new UsersResource();
                    angular.extend(user, response.user);
                    identity.currentUser = user;
                    deferred.resolve(true);
                }
                else {
                    deferred.resolve(false);
                }
            });

            return deferred.promise;
        };

        var logout = function logout(user){
            var deferred = $q.defer();

            $http.post('/logout').success(function () {
                identity.currentUser = undefined;
                deferred.resolve();
            });

            return deferred.promise;
        };

        var isAuthenticated = function isAuthenticated(){
            if (identity.isAuthenticated()) {
                return true;
            }
            else {
                return $q.reject('not authorized');
            }
        };

        var isAuthorizedForRole = function isAuthorizedForRole(role){
            if (identity.isAuthorizedForRole(role)) {
                return true;
            }
            else {
                return $q.reject('not authorized');
            }
        };

        return {
            signup: signUp,
            update: update,
            login: login,
            logout: logout,
            isAuthenticated: isAuthenticated,
            isAuthorizedForRole: isAuthorizedForRole
        }
    };

    angular
        .module('cardsAgainstHumanity.services')
        .factory('auth', authService);
}());