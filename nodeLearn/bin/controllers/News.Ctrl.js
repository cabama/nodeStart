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
const Utils_1 = require("../config/Utils");
const News_Model_1 = require("../models/News.Model");
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
class NewsController {
    firstWork(req, res) {
        console.log('Estoy en el first work');
        this.errorRules = new Rules(res);
        this.request = req;
        this.response = res;
        this.params = req.body;
    }
    test(req, res) {
        console.log('Its a test.');
        res.status(200).send(`Its a test, ${new Date().toISOString()}`);
    }
    createNew(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.firstWork(req, res);
            console.log('Despues del first');
            console.log(req.body);
            // Obtain user from post
            const newExist = Utils_1.everyExist([
                this.params.tittle,
                this.params.body,
            ]);
            if (!newExist) {
                res.status(500).send(JSON.stringify(req.body));
                return;
            }
            // Create UserModel
            let mdNews = new News_Model_1.newsModel();
            mdNews.title = this.params.tittle;
            mdNews.body = this.params.body;
            mdNews.createdBy = req.user._id;
            // Store user in mongodb
            let newStored = yield mdNews.save();
            res.status(200).send(newStored);
        });
    }
    getAllNews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Find Noticia
            let noticias;
            try {
                noticias = yield News_Model_1.newsModel.find();
            }
            catch (_a) {
                res.status(500).send({ message: 'Error in the request.' });
            }
            // Return Noticia
            if (noticias)
                res.status(200).send(noticias);
            else
                res.status(500).send({ message: 'The news not exist' });
        });
    }
    getANews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Obtain id from post
            let newsId = req.params.newsId;
            console.log(newsId);
            // Find Noticia
            let noticia;
            try {
                noticia = yield News_Model_1.newsModel.findById(newsId);
            }
            catch (_a) {
                res.status(500).send({ message: 'Error in the request.' });
            }
            // Return Noticia
            if (noticia)
                res.status(200).send(noticia);
            else
                res.status(500).send({ message: 'The news not exist' });
        });
    }
} //class
exports.NewsController = NewsController;
