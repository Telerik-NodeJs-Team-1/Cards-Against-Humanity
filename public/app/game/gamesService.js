(function(){
    'use strict';

    var gamesService = function gamesService($location, data){
        var createNewGame = function createNewGame(game){
            return data.post('/api/games', {ContentType: 'application/json'}, game);
        };

        var getAllGames = function getAllGames(){
            return data.get('/api/games');
        };

        return {
            createNewGame: createNewGame,
            getAllGames: getAllGames
        }
    };

    angular
        .module('cardsAgainstHumanity.services')
        .factory('games', ['$location', 'data', gamesService]);
}());