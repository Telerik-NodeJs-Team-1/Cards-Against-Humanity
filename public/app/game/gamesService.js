(function(){
    'use strict';

    var gamesService = function gamesService($location, data){
        var createNewGame = function createNewGame(game){
            return data.post('/api/games', {ContentType: 'application/json'}, game);
        };

        var getAllGames = function getAllGames(){
            return data.get('/api/games');
        };

        var getById = function getById(id){
            return data.get('/api/games/' + id);
        };

        return {
            createNewGame: createNewGame,
            getAllGames: getAllGames,
            getById: getById
        }
    };

    angular
        .module('cardsAgainstHumanity.services')
        .factory('games', ['$location', 'data', gamesService]);
}());