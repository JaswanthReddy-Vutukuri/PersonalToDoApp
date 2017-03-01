/* ============================================================================
Todo CRUD - Express / Mongoose / Angular
server.js

============================================================================ */
'use strict';

/* ============================================================================
External Modules/Packages Required
============================================================================ */
var express    = require('express');
var bodyParser = require('body-parser');
var http       = require('http');
var colours    = require('colors');
var logger     = require('morgan');
var jwt        = require('jsonwebtoken'); // used to create, sign, and verify tokens
require('colors');

/*===============================================================================
Models Used in the application - on Server end
=============================================================================*/
var TodoModel  = require('./server/models/mongSchemaModel');
var UserModel  = require('./server/models/User');

/*===============================================================================
Routes Used in the application - on Server end
=============================================================================*/
var todoRoutes = require('./server/routes/todo-routes.js');	//Exchange routes

/* ============================================================================
Create a new application with Express
============================================================================ */
var app = express(); 	

app.set('superSecret', 'lovetocode'); // secret variable

/* ============================================================================
Set the Port
============================================================================ */
app.set('port', process.env.PORT || 3080);

/* ============================================================================
Serve the static index.html from the public folder
============================================================================ */
app.use(express.static(__dirname + '/public')); 


/* ============================================================================
Use Middleware
============================================================================ */
app.use(logger('dev')); //log every request in dev mode only to the console

//parse application/json
app.use(bodyParser.json()); //needed for req.body
							
// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
var apiRoutes = express.Router(); 

// ---------------------------------------------------------
// authentication (no middleware necessary since this isnt authenticated)
// ---------------------------------------------------------
// http://localhost:8080/api/authenticate
apiRoutes.post('/authenticate', function(req, res) {

	// find the user
	UserModel.findOne({
		username: req.body.username
	}, function(err, user) {

		if (err) throw err;

		if (!user) {
			res.json({ success: false, message: 'Authentication failed. User not found.' });
		} else if (user) {

			// check if password matches
			if (user.password != req.body.password) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			} else {

				// if user is found and password is right
				// create a token
				var token = jwt.sign(user, app.get('superSecret'), {
					expiresIn: 86400 // expires in 24 hours
				});

				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}		

		}

	});
});

apiRoutes.post('/users', function(req, res){
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
	});
});

// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------
apiRoutes.use(function(req, res, next) {

	// check header or url parameters or post parameters for token
	var token = req.body.token || req.param('token') || req.headers['x-access-token'];

	// decode token
	if (token) {

		// verifies secret and checks exp
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {			
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });		
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;	
				next();
			}
		});

	} else {

		// if there is no token
		// return an error
		return res.status(403).send({ 
			success: false, 
			message: 'No token provided.'
		});
		
	}
	
});

// ---------------------------------------------------------
// authenticated routes
// ---------------------------------------------------------
apiRoutes.post('/todos', todoRoutes.createTodo);
apiRoutes.get('/todos', todoRoutes.getTodos);
apiRoutes.put('/todos/:todo_id', todoRoutes.updateTodo);
apiRoutes.delete('/todos/:todo_id', todoRoutes.deleteTodo);

app.use('/api', apiRoutes);

/* ============================================================================
Create HTTP Server using Express
============================================================================ */
var server = http.createServer(app);

/* ============================================================================ 
Bind to a port and listen for connections on it 
============================================================================ */
server.listen(app.get('port'), function() {
    console.log('Express HTTP server listening on port ' .
    	green + app.get('port'));
});

