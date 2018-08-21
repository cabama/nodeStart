'use strict';

import * as express from 'express';
import * as session from 'express-session'
import * as passport from 'passport'
import * as bodyParser from 'body-parser'
import mongoose = require("mongoose"); //import mongoose

import * as enrouting from './routes/index.router';
import { sessionSecret } from './config/getEnviroments';

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

//Mongo
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://mongoLearn:27017/learnMongo");

// App
const app = express()

app.use(session({
  secret: sessionSecret,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// set the view engine to ejs
//app.set('views', __dirnme + '/../public')
//app.set('view engine', 'ejs');

// Public folder
app.use(bodyParser.urlencoded({ 'extended': true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as jsonapp.use("/public", express.static(__dirname + '/../public'));

// Index Routing
app.use( '/api', new enrouting.Routing().enrouting );

app.listen(PORT, HOST, () => {});
console.log(`Running on http://${HOST}:${PORT}`);