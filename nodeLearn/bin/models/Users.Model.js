"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// grab the things we need
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
// create a schema
var userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: String,
    surname: String,
    role: String,
    image: String,
    avatar: String
});
userSchema.method('visible', function (password) {
    return {
        name: this.name,
        surname: this.surname,
        username: this.username,
        image: this.image,
        email: this.email
    };
});
// the schema is useless so far
// we need to create a model using it
exports.MdUser = mongoose.model('Users', userSchema);
