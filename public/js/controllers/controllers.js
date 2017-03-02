'use strict';

/* ============================================================================
Module - for the Controllers
============================================================================ */
angular.module('meanApp.controllers', [])

/**
 * Controller - ToDoCtrl
 */
.controller('MainCtrl', function($http, $q, getTodosService,
    createTodoService, updateTodoService, deleteTodoService, $log, $window, $location, $route) {

    var main =this;
    var username = $window.localStorage["userName"];
    main.formData = {};
    main.formData.username = username;
    /**
     * Get Todos
     */
    getTodosService.getTodos()
    .then(function(answer) {
        main.todos    = answer;
        main.username = $window.localStorage["userName"];
    },
    function(error) {
        console.log("OOPS!!!! " + JSON.stringify(error));
    });

    /*
     * Create a New Todo
     */
    main.createTodo = function() {
        createTodoService.createTodo(main.formData)
        .then(function(answer) {
            main.todos = answer;
        },
        function(error) {
        	console.log("Error Creating Todo!!!! " + JSON.stringify(error));
        });
    };

    /*
     * Update a Todo
     */
    main.editTodo = function(id, txt, isDone) {
    	var updateData = {"text":txt, "done": isDone};
    	updateTodoService.updateTodo(id, updateData)
    	.then(function(answer) {
    		main.todos = answer;
    	},
    	function(error) {
    		console.log("OOPS Error Updating!!!! " + JSON.stringify(error));
    	});
    };

    /**
     * Delete a Todo
     */
    main.deleteTodo = function(id) {
        deleteTodoService.deleteTodo(id)
        .then(function(answer) {
            main.todos = answer;
        },
        function(error) {
            console.log("OOPS Error Deleting!!!! " + JSON.stringify(error));
        });
    };

    main.logOut = function() {
        $location.path( "/" );
        $window.location.reload();
        console.log('Logged Out');
        return $window.localStorage.clear();
    }
})

/**
 * Controller - registerCtrl
 */
.controller('registerCtrl', function($http, $q,createUserService, $log, $location) {

    var vm =this;
    vm.formData = {};
    /*
     * Create a New User
     */
    vm.createUser = function() {
        console.log(vm.formData);
        createUserService.createUser(vm.formData)
        .then(function(result) {
            if(result.status == 200){
                console.log(result.message);
                $location.path( "/" );
            }else{
                console.log(result.message);
            }
        },
        function(error) {
            console.log("Error Creating User!!!! " + JSON.stringify(error));
        });
    };
})

/**
 * Controller - loginCtrl
 */
.controller('loginCtrl', function($http, $q, authUserService, $log, $location, $window) {

    var vm =this;
    vm.formData = {};
    /*
     * Authenticate User
     */
    vm.authUser = function() {
        console.log(vm.formData);
        authUserService.authUser(vm.formData)
        .then(function(result) {
            console.log(result);
            if(result.status == 200){
                $window.localStorage["userToken"] = result.token;
                $window.localStorage["userName"]  = result.username;
                $location.path( "/todo" );
                console.log(result.message);
            }
            else{
                console.log(result.message);
                $location.path( "/" );
            }
        },
        function(error) {
            console.log("Error Authenticating User!!!! " + JSON.stringify(error));
        });
    };
});