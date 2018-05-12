"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../services/jwt");
const Utils_1 = require("../config/Utils");
const byps = require("../services/bcrypt");
const Users_Model_1 = require("../models/Users.Model");
const config_1 = require("../config/config");
const fs = require("fs");
class Rules {
    constructor(res) {
        this.res = res;
    }
    noUserInHeader() {
        this.res.status(500).send('There arent all parameters');
        return -1;
    }
}
exports.Rules = Rules;
class CtrUser {
    firstWork(req, res) {
        console.log('Estoy en el first work');
        this.errorRules = new Rules(res);
        this.request = req;
        this.response = res;
        this.params = req.body;
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.firstWork(req, res);
            // Obtain user from header
            const paramUser = this.getUserFromParams();
            if (!paramUser) {
                this.errorRules.noUserInHeader;
                return;
            }
            // Create UserModel
            let mdUser = new Users_Model_1.MdUser();
            mdUser.username = paramUser.username;
            mdUser.name = paramUser.name;
            mdUser.surname = paramUser.surname;
            mdUser.email = paramUser.email.toLowerCase();
            mdUser.role = 'ADMIN';
            mdUser.password = yield byps.hash(paramUser.password);
            // Store user in mongodb
            this.saveUser(mdUser)
                .then(() => {
                res.status(200).send('User saved!');
            })
                .catch(reason => {
                res.status(500).send(reason);
            });
        });
    }
    modifyUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.firstWork(req, res);
            Users_Model_1.MdUser.findByIdAndUpdate(this.params._id, this.params)
                .then(() => {
                res.status(200).send('User updated!');
            })
                .catch(reason => {
                res.status(500).send('Error updating user!');
            });
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.firstWork(req, res);
            let checkParams = Utils_1.everyExist([
                this.params.password,
                this.params.email
            ]);
            console.log(`Parametros tomados del loging: ${this.params.password} ${this.params.email}`);
            if (!checkParams) {
                this.errorRules.noUserInHeader;
            }
            // Consult in Mongo
            let user = yield Users_Model_1.MdUser.findOne({ email: this.params.email });
            if (!user)
                res.status(404).send({ message: 'Usuario o contraseña incorrectos.' });
            console.log(user);
            // Compare password
            let a = yield byps.compare(this.params.password, user.password);
            if (!a)
                res.status(404).send({ message: 'Usuario o contraseña incorrectos.' });
            // Return token or user
            console.log(a);
            if (this.params.getHash) {
                res.status(200).send({ user, token: jwt_1.JwtService.createToken(user) });
            }
            else {
                res.status(200).send({ user });
            }
        });
    } // loginUser
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let userId = req.params.userId;
            let user;
            try {
                user = yield Users_Model_1.MdUser.findById(userId);
            }
            catch (_a) {
                res.status(500).send({ message: 'Error in the request.' });
            }
            // Return Noticia
            if (!user)
                res.status(500).send({ message: 'user not exist' });
            res.status(200).send(user.visible());
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let users;
            try {
                users = yield Users_Model_1.MdUser.find();
            }
            catch (_a) {
                res.status(500).send({ message: 'Error in the request.' });
            }
            // Return Noticia
            if (!users)
                res.status(500).send({ message: 'not exist users' });
            const usuariosSafe = users.map(user => {
                return user.visible();
            });
            res.status(200).send(usuariosSafe);
        });
    }
    getAllUsersAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let users;
            try {
                users = yield Users_Model_1.MdUser.find();
            }
            catch (_a) {
                res.status(500).send({ message: 'Error in the request.' });
            }
            // Return Noticia
            if (!users)
                res.status(500).send({ message: 'not exist users' });
            res.status(200).send(users);
        });
    }
    saveAvatar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            if (req.files && !!req.files.image.path && !!userId) {
                const filePath = req.files.image.path;
                const fileNameSplit = filePath.split('/');
                const fileName = fileNameSplit[fileNameSplit.length - 1];
                console.log(`fileName: ${fileName}`);
                const fileExtensionSplit = fileName.split('.');
                const fileExtension = fileExtensionSplit[fileExtensionSplit.length - 1];
                yield this.deleteAvatar(userId);
                Users_Model_1.MdUser.findByIdAndUpdate(userId, { avatar: fileName })
                    .then(() => {
                    res.status(200).send('filePath:' + fileExtension);
                })
                    .catch(() => {
                    res.status(500).send('Error uploading user avatar');
                });
            }
            else {
                res.status(500).send(`Error subiendo el avatar, ${userId}`);
            }
        });
    }
    deleteAvatar(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield Users_Model_1.MdUser.findById(userId);
            try {
                fs.unlinkSync(config_1.CONFIG.avatarPath + '/' + usuario.avatar);
            }
            catch (_a) {
                console.error('Error borrabdo un avatar');
            }
            console.log(`Usuario=>${usuario}`);
        });
    }
    getUserFromParams() {
        const username = this.params.username;
        const name = this.params.name;
        const surname = this.params.surname;
        const email = this.params.email;
        const role = 'Admin';
        const password = this.params.password;
        const checkParams = Utils_1.everyExist([username, name, surname, email, password]);
        if (checkParams) {
            return { username, name, surname, email, role, password };
        }
        else {
            return false;
        }
    }
    saveUser(mdUser) {
        return new Promise((resolve, reject) => {
            mdUser.save((err, userStore) => {
                if (err) {
                    return reject('Error saving user.');
                }
                else {
                    if (!userStore) {
                        return reject('The user is not saved');
                    }
                    else {
                        resolve(true);
                    }
                }
            });
        });
    }
} //class
exports.CtrUser = CtrUser;
