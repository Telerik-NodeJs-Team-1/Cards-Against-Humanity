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

        var joinGame = function joinGame(gameId, username){
            return data.post('/games/' + gameId, {ContentType: 'application/json'}, {gameId: gameId, username: username});
        };

        var leaveGame = function leaveGame(gameId, username){
            return data.post('/api/games/' + gameId, {ContentType: 'application/json'}, {gameId: gameId, username: username, toRemove: true});
        };

        var registerCzarCards = function registerCzarCards(gameId, cards){
            return data.post('/api/games/' + gameId + '/cards/czar', {ContentType: 'application/json'}, {gameId: gameId, cards: cards});
        };

        var registerUserCards = function registerUserCards(gameId, username, cards){
            return data.post('/api/games/' + gameId + '/cards/user', {ContentType: 'application/json'}, {username: username, cards: cards});
        };

        return {
            createNewGame: createNewGame,
            getAllGames: getAllGames,
            getById: getById,
            joinGame: joinGame,
            leaveGame: leaveGame,
            registerCzarCards: registerCzarCards,
            registerUserCards: registerUserCards
        }
    };

    angular
        .module('cardsAgainstHumanity.services')
        .factory('games', ['$location', 'data', gamesService]);
}());