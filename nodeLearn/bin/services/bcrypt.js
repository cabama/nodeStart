"use strict";
// This is a refactor of bcrypt for this use with Promise
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt-nodejs");
function hash(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, null, null, (err, hash) => {
            if (hash) {
                resolve(hash);
            }
            else {
                reject(err);
            }
        });
    }); //Promise
}
exports.hash = hash;
function compare(string1, string2) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(string1, string2, (err, check) => {
            if (check) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        });
    }); //Promise
}
exports.compare = compare;
