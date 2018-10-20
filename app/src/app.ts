'use strict';

import * as express from 'express';
import * as session from 'express-session'
import * as passport from 'passport'
import * as bodyParser from 'body-parser'
import * as fileUpload from 'express-fileupload' 
import mongoose = require("mongoose"); //import mongoose
import * as path from 'path'
import * as enrouting from './routes/index.router';
import { sessionSecret, PublicPath } from './config/getEnviroments';

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

//Mongo
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://mongoLearn:27017/learnMongo");

// View
const app = express()

app.use(session({
  secret: sessionSecret,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(fileUpload())
// set the view engine to ejs
//app.set('views', __dirnme + '/../public')
//app.set('view engine', 'ejs');

// Public folder
app.use(bodyParser.urlencoded({ 'extended': true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as jsonapp.use("/public", express.static(__dirname + '/../public'));

// CORS
var cors = require('cors')
app.options('*', cors())
// Index Routing
const publicPath = PublicPath
app.use("/public", express.static(publicPath))
app.use('/api', new enrouting.Routing().enrouting )

app.listen(PORT, HOST, () => {});
console.log(`Running on http://${HOST}:${PORT}`);