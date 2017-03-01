/* ============================================================================
	Server side Routing
	Route Definitions

============================================================================ */
'use strict';

//Get the Mongoose Model
var TodoModel = require('../models/mongSchemaModel');
var UserModel = require('../models/mongSchemaModel');

module.exports = {
    /* ========================================================================
    CREATE - $http post
    ======================================================================== */
    createUser:function(req, res) {
        //create a user, information comes from AJAX request from Angular
        UserModel.create({
			firstName : req.body.firstName,
			lastName  : req.body.lastName,
			username  : req.body.username,
			password  : req.body.password		
		},
		function(err, user) {
			if (err) {
				res.send(err);
			};

			//get and return all the todos after you create another
			/*TodoModel.find(function(err, todos) {
				if (err) {
					return res.send(err);
				}
				else {
					return res.json(todos);
				};
			});*/
		});
    }
}