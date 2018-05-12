'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// https://nodejs.org/uk/docs/guides/nodejs-docker-webapp/
//const express = require('express');
const express = require("express");
const enrouting = require("./routes/Index.Router");
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); //import mongoose
const node_schedule_1 = require("node-schedule");
const analytics_Ctrl_1 = require("./controllers/analytics.Ctrl");
// Constants
const PORT = 80;
const HOST = '0.0.0.0';
//Mongo
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://mongo:27017/jaguer");
// App
const app = express();
// set the view engine to ejs
//app.set('views', __dirname + '/../public')
//app.set('view engine', 'ejs');
// Public folder
app.use(bodyParser.json());
app.use("/public", express.static(__dirname + '/../public'));
// Index Routing
app.use('/api', new enrouting.routing_jaguer().enrouting);
app.listen(PORT, HOST, () => {
    let analyticsCTR = new analytics_Ctrl_1.AnalyticsController();
    const task = () => {
        analyticsCTR.scheduleGetRanking();
        analyticsCTR.scheduleCalendar();
    };
    task();
    node_schedule_1.scheduleJob('*/10 * * * *', () => {
        task();
    });
});
console.log(`Running on http://${HOST}:${PORT}`);
