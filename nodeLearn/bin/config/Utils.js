"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NOT WORK
function everyTrue(array) {
    console.log('Estoy en everyTrue', array);
    array.forEach(element => {
        if (element == false) {
            return false;
        }
    });
    return true;
}
exports.everyTrue = everyTrue;
function everyExist(array) {
    for (let i = 0; i < array.length; i++) {
        let elemento = !!array[i];
        if (elemento == false) {
            return false;
        }
    }
    return true;
}
exports.everyExist = everyExist;
function deleteKey(obj, key) {
    const index = this.data.indexOf(key);
    if (index !== -1) {
        this.data.splice(index, 1);
    }
}
exports.deleteKey = deleteKey;
