"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Cargamos el modulo para poder utilizar el enrutador de express
const express_1 = require("express");
const jwt_1 = require("../services/jwt");
const News_Ctrl_1 = require("../controllers/News.Ctrl");
class NewsRouter {
    constructor() {
        this.router = express_1.Router();
        this.jwt = new jwt_1.JwtService();
        this.newsController = new News_Ctrl_1.NewsController();
        this.router.get('/', (req, res) => this.newsController.getAllNews(req, res));
        this.router.get('/:newsId', (req, res) => this.newsController.getANews(req, res));
        this.router.post('/', this.jwt.ensureAuth, (req, res) => this.newsController.createNew(req, res));
    }
    get enrouting() { return this.router; }
}
exports.NewsRouter = NewsRouter;
