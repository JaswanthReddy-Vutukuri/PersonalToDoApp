'use strict';
/* ============================================================================
Module - For Routes
============================================================================ */
angular.module('meanApp.routes', ['ui.router']).


config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('login', {
            url: '/',
            templateUrl: 'views/login.html',
            controller: 'loginCtrl',
            controllerAs: 'vm',
            reloadOnSearch: false
        })
    .state('register', {
            url: '/register',
            templateUrl: 'views/register.html',
            controller: 'registerCtrl',
            controllerAs: 'vm',
            reloadOnSearch: false
        })
    .state('todo', {
            url: '/',
            templateUrl: 'views/todo.html',
            controller: 'MainCtrl',
            controllerAs: 'main',
            reloadOnSearch: false
        });

    $urlRouterProvider.otherwise('/');  

    //$locationProvider.html5Mode(true);
});