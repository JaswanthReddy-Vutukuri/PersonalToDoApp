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
            controllerAs: 'login',
            reloadOnSearch: false
        })
    .state('register', {
            url: '/register',
            templateUrl: 'views/register.html',
            controller: 'registerCtrl',
            controllerAs: 'register',
            reloadOnSearch: false
        })
    .state('todo', {
            url: '/todo',
            templateUrl: 'views/todo.html',
            controller: 'MainCtrl',
            controllerAs: 'main',
            reloadOnSearch: false
        });

    $urlRouterProvider.otherwise('/');  

});