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
            return data.get('/games/' + id);
        };

        var registerCzarCards = function registerCzarCards(gameId, cards){
            return data.post('/games/' + gameId + '/cards/czar', {ContentType: 'application/json'}, {gameId: gameId, cards: cards});
        };

        var registerUserCards = function registerUserCards(gameId, cards){
            return data.post('/games/' + gameId + '/cards/user', {ContentType: 'application/json'}, {cards: cards});
        };

        return {
            createNewGame: createNewGame,
            getAllGames: getAllGames,
            getById: getById,
            registerCzarCards: registerCzarCards,
            registerUserCards: registerUserCards
        }
    };

    angular
        .module('cardsAgainstHumanity.services')
        .factory('games', ['$location', 'data', gamesService]);
}());