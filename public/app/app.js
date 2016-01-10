(function() {
    "use strict";

    var run = function run($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
            if (rejection === 'not authorized') {
                $location.path('/unauthorized');
            }
        })
    };

    var config = function config($routeProvider, $locationProvider) {
        var CONTROLLER_AS_VIEW_MODEL = 'vm';

        $locationProvider.html5Mode(true);
        var routeUserChecks = {
            adminRole: {
                authenticate: function (auth) {
                    return auth.isAuthorizedForRole('admin');
                }
            },
            authenticated: {
                authenticate: function (auth) {
                    return auth.isAuthenticated();
                }
            }
        };

        $routeProvider
            .when('/', {
                templateUrl: '/partials/main/home',
                controller: 'HomePageController',
                controllerAs: CONTROLLER_AS_VIEW_MODEL
            })
            .when('/games/create', {
                templateUrl: '/partials/game/create-game',
                controller: 'CreateGameController',
                controllerAs: CONTROLLER_AS_VIEW_MODEL,
                resolve: routeUserChecks.authenticated
            })
            .when('/games/view', {
                templateUrl: '/partials/game/view-available-games',
                controller: 'ViewAvailableGamesController',
                controllerAs: CONTROLLER_AS_VIEW_MODEL,
                resolve: routeUserChecks.authenticated
            })
            .when('/signup', {
                templateUrl: '/partials/account/signup',
                controller: 'SignUpCtrl',
                controllerAs: CONTROLLER_AS_VIEW_MODEL
            })
            .when('/profile', {
                templateUrl: '/partials/account/profile',
                controller: 'ProfileCtrl',
                controllerAs: CONTROLLER_AS_VIEW_MODEL,
                resolve: routeUserChecks.authenticated
            })
            .when('/admin/users', {
                templateUrl: '/partials/admin/users-list',
                controller: 'UserListCtrl',
                controllerAs: CONTROLLER_AS_VIEW_MODEL,
                resolve: routeUserChecks.adminRole
            })
            .when('/notfound', {
                templateUrl: '/partials/common/not-found'
            })
            .when('/unauthorized', {
                templateUrl: '/partials/common/unauthorized'
            })
            .otherwise({redirectTo: '/notfound'})
    };

    angular.module('cardsAgainstHumanity.services', []);
    angular.module('cardsAgainstHumanity.controllers', ['cardsAgainstHumanity.services']);
    angular.module('cardsAgainstHumanity', ['ngResource', 'ngRoute', 'cardsAgainstHumanity.controllers'])
        .value('toastr', toastr)
        .config(['$routeProvider','$locationProvider',config])
        .run(['$rootScope', '$location', run]);
}());