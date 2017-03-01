/*================================================================
	Server side Routing
	Route Declarations

=================================================================*/


/* ========================================================== 
Internal App Modules/Packages Required
============================================================ */
var todoRoutes = require('./routes/todo-routes.js');	//Exchange routes
var userRoutes = require('./routes/user-routes.js');	//Exchange routes

module.exports = function(app) 
{

	/*================================================================
	ROUTES
	=================================================================*/
	app.post('/api/todos', todoRoutes.createTodo);
	app.get('/api/todos', todoRoutes.getTodos);
	app.put('/api/todos/:todo_id', todoRoutes.updateTodo);
	app.delete('/api/todos/:todo_id', todoRoutes.deleteTodo);
	app.post('/api/users', userRoutes.createUser);
};