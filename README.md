## Synopsis
 
A CRUD App using the $HTTP service with verbs post, get, put and delete and built with:
- NodeJS 
- ExpressJS 
- AngularJS
- MongoDB
- Mongoose
- Bootstrap
- JWT

Node/Express provides the RESTful API that connects to MongoDB. 
Angular accesses the RESTful api via $http

The program is mainly based on a Node Todo Tutorial on [scotch.io](http://scotch.io/tutorials/javascript/creating-a-single-page-todo-app-with-node-and-angular). The tutorials on [scotch.io](http://scotch.io) are quite good.

A gulp gulpfile.js is configured with various tasks that can filter, concatenate, minify and watch different file types e.g. JS, CSS, HTML. 


# Requirements

* npm
* bower
* Node
* MongoDB running 


## Installation

* Clone the Repository
* npm install - install all the node packages listed in the package.json file 
* bower install - installs the front end packages listed in the bower.json file
* Turn on MongoDB
* Open ../server/config/database.js and enter Mongo database details
* node server.js - start up Node\Express server
* Browse to http://localhost:3080

