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
const Match_Model_1 = require("../models/Match.Model");
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
class MatchController {
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
    createNewMatch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.firstWork(req, res);
            console.log(req.body);
            // Create UserModel
            let mdMatch = new Match_Model_1.matchModel();
            mdMatch.title = this.params.tittle;
            mdMatch.team1 = this.params.team1;
            mdMatch.team2 = this.params.team2;
            mdMatch.place = this.params.place;
            mdMatch.createdBy = req.user._id;
            // Store user in mongodb
            let matchStored;
            try {
                matchStored = yield mdMatch.save();
            }
            catch (reason) {
                res.status(500).send('No se pudo guardar: ' + reason);
            }
            debugger;
            console.log(matchStored);
            res.status(200).send(matchStored);
        });
    }
    getAllMatchAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let matchs;
            try {
                matchs = yield Match_Model_1.matchModel.find();
            }
            catch (_a) {
                res.status(500).send({ message: 'Error in the request.' });
            }
            // Return Noticia
            if (!matchs)
                res.status(500).send({ message: 'not exist matchs' });
            res.status(200).send(matchs);
        });
    }
    statusMatch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.firstWork(req, res);
            const matchId = this.params.matchId;
            const status = this.params.status;
            const id = req.user._id;
            Match_Model_1.matchModel.findById(matchId)
                .then(match => {
                debugger;
                let a = match.toObject();
                a.letsgo.find(user => { return user.userid == id; });
                if (a) {
                    a.status = status;
                }
                else {
                    match.letsgo.push({ 'userid': id, 'status': status });
                }
                return match.save();
            })
                .then(match => {
                res.status(200).send(match);
            })
                .catch(reason => {
                res.status(500).send({ message: 'Cant update.' + reason });
            });
        });
    }
} //class
exports.MatchController = MatchController;
