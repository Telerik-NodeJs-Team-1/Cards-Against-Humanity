(function(){
    'use strict';

    var gamesService = function gamesService($http, $location, $q){
        var createNewGame = function createNewGame(game){
            var deferred = $q.defer();

            $http.post('/api/games', game, {ContentType: 'application/json'})
                .then(function(res){
                    $location.path('/');
                    deferred.resolve(res.data);
                }, function(res){
                    deferred.reject(res);
                });

            return deferred.promise;
        };

        return {
            createNewGame: createNewGame
        }
    };

    angular
        .module('cardsAgainstHumanity.services')
        .factory('games', gamesService)
}());