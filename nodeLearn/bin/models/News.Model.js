"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// grab the things we need
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
var newsSchema = new mongoose_1.Schema({
    title: String,
    body: String,
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "Users" },
    date: { type: Date, default: Date.now },
    hidden: Boolean,
});
// the schema is useless so far
// we need to create a model using it
exports.newsModel = mongoose.model('News', newsSchema);
