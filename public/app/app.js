var app = angular.module('app', ['ngResource', 'ngRoute']).value('toastr', toastr);
var CONTROLLER_AS_VIEW_MODEL = 'vm';

app.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    var routeUserChecks = {
        adminRole: {
            authenticate: function(auth) {
                return auth.isAuthorizedForRole('admin');
            }
        },
        authenticated: {
            authenticate: function(auth) {
                return auth.isAuthenticated();
            }
        }
    };

    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/home',
            controller: 'MainCtrl',
            controllerAs: CONTROLLER_AS_VIEW_MODEL
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
});

app.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    })
});