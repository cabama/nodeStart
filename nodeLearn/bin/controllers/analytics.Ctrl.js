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
const getMadridData_1 = require("../services/getMadridData");
const Ranking_Model_1 = require("../models/Ranking.Model");
const Calendar_Model_1 = require("../models/Calendar.Model");
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
class AnalyticsController {
    firstWork(req, res) {
        console.log('Estoy en el first work');
        this.errorRules = new Rules(res);
        this.request = req;
        this.response = res;
        this.params = req.body;
    }
    ranking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.firstWork(req, res);
            getMadridData_1.getRankingJSON()
                .then(stadist => {
                stadist = stadist.sort((a, b) => { return a.Posicion - b.Posicion; });
                res.status(200).send(stadist);
                console.log('He terminado joder');
                console.log(stadist);
            })
                .catch(reason => {
                console.log(reason);
            });
        });
    }
    getRanking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let ranking;
            try {
                ranking = yield Ranking_Model_1.rankingModel.find();
            }
            catch (_a) {
                res.status(500).send({ message: 'Error in the request.' });
            }
            if (!ranking)
                res.status(500).send({ message: 'The news not exist' });
            // Return Noticia
            ranking.sort((a, b) => { return a.Posicion - b.Posicion; });
            res.status(200).send(ranking);
        });
    }
    getCalendar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let ranking;
            try {
                ranking = yield Calendar_Model_1.calendarModel.find();
            }
            catch (_a) {
                res.status(500).send({ message: 'Error in the request.' });
            }
            if (!ranking)
                res.status(500).send({ message: 'The news not exist' });
            // Return Noticia
            res.status(200).send(ranking);
        });
    }
    scheduleGetRanking() {
        return __awaiter(this, void 0, void 0, function* () {
            getMadridData_1.getRankingJSON()
                .then((stadist) => __awaiter(this, void 0, void 0, function* () {
                stadist = (stadist.sort((a, b) => { return a.Posicion - b.Posicion; }));
                yield Ranking_Model_1.rankingModel.remove({});
                stadist.forEach((stadist2) => __awaiter(this, void 0, void 0, function* () {
                    let rankingModelo = new Ranking_Model_1.rankingModel();
                    rankingModelo.Codigo_competicion = stadist2.Codigo_competicion;
                    rankingModelo.Codigo_equipo = stadist2.Codigo_equipo;
                    rankingModelo.Codigo_fase = stadist2.Codigo_fase;
                    rankingModelo.Codigo_grupo = stadist2.Codigo_grupo;
                    rankingModelo.Codigo_temporada = stadist2.Codigo_temporada;
                    rankingModelo.Goles_contra = stadist2.Goles_contra;
                    rankingModelo.Goles_favor = stadist2.Goles_favor;
                    rankingModelo.Nombre_categoria = stadist2.Nombre_categoria;
                    rankingModelo.Nombre_competicion = stadist2.Nombre_competicion;
                    rankingModelo.Nombre_deporte = stadist2.Nombre_deporte;
                    rankingModelo.Nombre_distrito = stadist2.Nombre_distrito;
                    rankingModelo.Nombre_equipo = stadist2.Nombre_equipo;
                    rankingModelo.Nombre_fase = stadist2.Nombre_fase;
                    rankingModelo.Nombre_grupo = stadist2.Nombre_grupo;
                    rankingModelo.Nombre_temporada = stadist2.Nombre_temporada;
                    rankingModelo.Partidos_empatados = stadist2.Partidos_empatados;
                    rankingModelo.Partidos_ganados = stadist2.Partidos_ganados;
                    rankingModelo.Partidos_jugados = stadist2.Partidos_jugados;
                    rankingModelo.Partidos_perdidos = stadist2.Partidos_perdidos;
                    rankingModelo.Posicion = stadist2.Posicion;
                    rankingModelo.Puntos = stadist2.Puntos;
                    yield rankingModelo.save();
                }));
            }));
        });
    }
    scheduleCalendar() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Comienzo mi tarea de calendario.');
            getMadridData_1.getCalendarJSON()
                .then((calendarioJson) => __awaiter(this, void 0, void 0, function* () {
                yield Calendar_Model_1.calendarModel.remove({});
                calendarioJson.forEach((jornada) => __awaiter(this, void 0, void 0, function* () {
                    let calendarMd = new Calendar_Model_1.calendarModel();
                    for (let key in jornada) {
                        calendarMd[key] = jornada[key];
                    }
                    let f = new Date(jornada.Fecha);
                    const hora = parseInt(jornada.Hora.match(/([0-9][0-9]):/)[1]);
                    const min = parseInt(jornada.Hora.match(/:(.*)/)[1]);
                    f.setHours(hora, min);
                    calendarMd.Date = f;
                    yield calendarMd.save();
                }));
            }));
        });
    }
} //class
exports.AnalyticsController = AnalyticsController;
