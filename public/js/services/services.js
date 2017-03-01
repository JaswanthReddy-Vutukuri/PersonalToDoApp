'use strict';

/* ============================================================================
Module - for the Services
============================================================================ */
angular.module('meanApp.services', []).

/**
 * getTodos - Factory Service
 */
factory('getTodosService', function($http, $q, $window) {
    
    var token = $window.sessionStorage.accessToken;
    
    /*=========================================================================
    READ - $http get
    ======================================================================== */
    var getTodos = function() {
        var deferred = $q.defer();
        $http.get('/api/todos/', {params: {token: token}}).
        success(function(data) {
            console.log(data);
            deferred.resolve(data);
        }).
        error(function(reason) {
            deferred.reject(reason);
        });
        return deferred.promise
    }
    //Return Factory Object
    return {
        getTodos: getTodos
    };
}).

/**
 * Create Todo - Factory Service
 */
factory('createTodoService', function($http, $q, $window) {

    var token = $window.sessionStorage.accessToken;

    /*=========================================================================
    CREATE - $http post
    ======================================================================== */
    var createTodo = function(todo) {
        var deferred = $q.defer();
        $http.post('/api/todos/', todo, {params: {token: token}}).
        success(function(data) {
            deferred.resolve(data);
        }).
        error(function(reason) {
            deferred.reject(reason);
        });
        return deferred.promise
    }
    //Return Factory Object
    return {
        createTodo: createTodo
    } 
}).

/**
 * Update Todo - Factory Service
 */
factory('updateTodoService', function($http, $q, $window) {

    var token = $window.sessionStorage.accessToken;

    /*=========================================================================
    UPDATE - $http put
    ======================================================================== */
    var updateTodo = function(id, updateData) {
	    
        var deferred = $q.defer();

        $http.put('/api/todos/' + id, updateData, {params: {token: token}}).
        success(function(data) {
            deferred.resolve(data);
        }).
        error(function(reason) {
            deferred.reject(reason);
        });
        return deferred.promise
    }
    //Return Factory Object
    return {
        updateTodo: updateTodo
    } 
}).

/**
 * Delete Todo - Factory Service
 */
factory('deleteTodoService', function($http, $q, $window) {

    var token = $window.sessionStorage.accessToken;

    /*=========================================================================
    DELETE - $http delete
    ======================================================================== */
    var deleteTodo = function(id) {

        var deferred = $q.defer();
        $http.delete('/api/todos/' + id, {params: {token: token}}).
        success(function(data) {
            deferred.resolve(data);
        }).
        error(function(reason) {
            deferred.reject(reason);
        });
        return deferred.promise
    }
    //Return Factory Object
    return {
        deleteTodo: deleteTodo
    }
}).

/**
 * Create User - Factory Service
 */
factory('createUserService', function($http, $q) {

    /*=========================================================================
    CREATE - $http post
    ======================================================================== */
    var createUser = function(user) {
        var deferred = $q.defer();
        $http.post('/api/users/', user).
        success(function(data) {
            deferred.resolve(data);
        }).
        error(function(reason) {
            deferred.reject(reason);
        });
        return deferred.promise
    }
    //Return Factory Object
    return {
        createUser: createUser
    } 
}).

/**
 * Authenticate User - Factory Service
 */
factory('authUserService', function($http, $q) {

    /*=========================================================================
    CREATE - $http post
    ======================================================================== */
    var authUser = function(user) {
        var deferred = $q.defer();
        $http.post('/api/authenticate', user).
        success(function(data) {
            deferred.resolve(data);
        }).
        error(function(reason) {
            deferred.reject(reason);
        });
        return deferred.promise
    }
    //Return Factory Object
    return {
        authUser: authUser
    } 
});