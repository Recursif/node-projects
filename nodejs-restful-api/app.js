var express = require('express');
var app = express();
var db = require('./db');

var UserController = require('./user/userController')
var AuthController = require('./auth/authController')


app.use('/users', UserController)
app.use('/api/auth', AuthController)

module.exports = app;

