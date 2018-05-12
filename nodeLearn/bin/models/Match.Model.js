"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// grab the things we need
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
var matchSchema = new mongoose_1.Schema({
    title: String,
    team1: String,
    team2: String,
    date: Date,
    place: {
        tittle: String,
        gmaps: String
    },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "Users" },
    createdDate: { type: Date, default: Date.now },
    letsgo: [{
            userid: { type: mongoose_1.Schema.Types.ObjectId },
            status: String
        }],
    hidden: { type: Boolean, default: false }
});
// the schema is useless so far
// we need to create a model using it
exports.matchModel = mongoose.model('Match', matchSchema);
