"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Cargamos el modulo para poder utilizar el enrutador de express
const express_1 = require("express");
const jwt_1 = require("../services/jwt");
const News_Router_1 = require("./News.Router");
const Users_Ctrl_1 = require("../controllers/Users.Ctrl");
const analytics_Ctrl_1 = require("../controllers/analytics.Ctrl");
const Match_Ctrl_1 = require("../controllers/Match.Ctrl");
const config_1 = require("../config/config");
const multipart = require("connect-multiparty");
var md_uploads = multipart({ uploadDir: config_1.CONFIG.avatarPath });
class routing_jaguer {
    constructor() {
        this.router = express_1.Router();
        this.jwt = new jwt_1.JwtService();
        this.userController = new Users_Ctrl_1.CtrUser();
        this.matchController = new Match_Ctrl_1.MatchController();
        this.analytics = new analytics_Ctrl_1.AnalyticsController();
        // this.router.get('/', this.jwt.ensureAuth, (req, res) => this.UserController.test(req, res));
        this.router.post('/login', (req, res) => this.userController.loginUser(req, res));
        this.router.post('/user', (req, res) => this.userController.createUser(req, res));
        this.router.put('/user', (req, res) => this.userController.modifyUser(req, res));
        this.router.get('/user/all', (req, res) => this.userController.getAllUsers(req, res));
        this.router.get('/user/allAdmin', this.jwt.ensureAuth, (req, res) => this.userController.getAllUsersAdmin(req, res));
        this.router.get('/user/:userId', (req, res) => this.userController.getUserById(req, res));
        // Upload User Avatar
        this.router.post('/user/avatar/:userId', md_uploads, (req, res) => this.userController.saveAvatar(req, res));
        this.router.get('/data/ranking', (req, res) => this.analytics.getRanking(req, res));
        this.router.get('/data/calendar', (req, res) => this.analytics.getCalendar(req, res));
        this.router.get('/match/admin', this.jwt.ensureAuth, (req, res) => this.matchController.getAllMatchAdmin(req, res));
        this.router.post('/match/new', this.jwt.ensureAuth, (req, res) => this.matchController.createNewMatch(req, res));
        this.router.put('/match/status', this.jwt.ensureAuth, (req, res) => this.matchController.statusMatch(req, res));
        // Subroutes :)
        this.router.use('/news', new News_Router_1.NewsRouter().enrouting);
    }
    get enrouting() { return this.router; }
}
exports.routing_jaguer = routing_jaguer;
