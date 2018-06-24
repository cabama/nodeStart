'use strict';

import * as express from 'express';
import * as session from 'express-session'
import * as passport from 'passport'
import * as bodyParser from 'body-parser'
import mongoose = require("mongoose"); //import mongoose

import * as enrouting from './routes/Index.Router';

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

//Mongo
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://mongoLearn:27017/jaguer");

// App
const app = express()

app.use(session({
  secret: 's3cr3t',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


// set the view engine to ejs
//app.set('views', __dirnme + '/../public')
//app.set('view engine', 'ejs');

// Public folder
app.use(bodyParser.json())
app.use("/public", express.static(__dirname + '/../public'));

// Index Routing
app.use( '/api', new enrouting.routing_jaguer().enrouting );

app.listen(PORT, HOST, () => {});
console.log(`Running on http://${HOST}:${PORT}`);