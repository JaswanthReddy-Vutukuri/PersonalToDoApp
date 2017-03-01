'use strict';
/* ============================================================================
Module - For Routes
============================================================================ */
angular.module('meanApp.routes', ['ngRoute']).


config(function ($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'views/login.html',
        controller: 'loginCtrl',
        controllerAs: 'vm',
        reloadOnSearch: false
    })
    .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'registerCtrl',
        controllerAs: 'vm',
        reloadOnSearch: false
    })    
    .when('/todo', {
        templateUrl: 'views/todo.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        reloadOnSearch: false
    })  
    .otherwise({
        redirectTo: '/'
    });
      
    $locationProvider.html5Mode(true);
});