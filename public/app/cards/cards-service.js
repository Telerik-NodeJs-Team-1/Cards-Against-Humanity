(function(){
    'use strict';

    var cardsService = function cardsService(data){
        var getBlackCardById = function(id){
            return data.get('/api/cards/black/' + id);
        };

        return {
            getBlackCardById: getBlackCardById
        }
    };

    angular
        .module('cardsAgainstHumanity.services')
        .factory('cards', ['data', cardsService]);
}());