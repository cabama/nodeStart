'use strict';

// https://nodejs.org/uk/docs/guides/nodejs-docker-webapp/

//const express = require('express');
import * as express from 'express';
import * as moment from 'moment';
import * as enrouting from './routes/Index.Router';
import * as bodyParser from 'body-parser'
import * as sche from 'node-schedule'
import mongoose = require("mongoose"); //import mongoose
import { scheduleJob } from 'node-schedule';

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

//Mongo
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://mongoLearn:27017/jaguer");

// App
const app = express()

// set the view engine to ejs
//app.set('views', __dirname + '/../public')
//app.set('view engine', 'ejs');

// Public folder
app.use(bodyParser.json())
app.use("/public", express.static(__dirname + '/../public'));

// Index Routing
app.use( '/api', new enrouting.routing_jaguer().enrouting );

app.listen(PORT, HOST, () => {});
console.log(`Running on http://${HOST}:${PORT}`);