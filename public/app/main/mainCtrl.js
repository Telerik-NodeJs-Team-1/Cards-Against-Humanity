(function(){
    "use strict";

    var homePageController = function homePageController() {
        var vm = this;
        vm.greeting = 'Hi from Team 1';
    };

    angular.module('app')
        .controller('HomePageController', homePageController);
}());