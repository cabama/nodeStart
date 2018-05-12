"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const request = require("request");
const csv = require("csvtojson");
function getRanking() {
    const options = {
        host: 'datos.madrid.es',
        port: 80,
        path: '/egob/catalogo/211549-1-juegos-deportivos-actual.csv'
    };
    let a;
    return axios_1.default.get('http://datos.madrid.es/egob/catalogo/211549-1-juegos-deportivos-actual.csv');
}
exports.getRanking = getRanking;
function getRankingJSON() {
    return new Promise((resolve, reject) => {
        let clasificaciones = [];
        try {
            csv({ delimiter: ";" })
                .fromStream(request.get('http://datos.madrid.es/egob/catalogo/211549-1-juegos-deportivos-actual.csv'))
                .on('done', (error) => {
                if (error)
                    reject(error);
                else
                    resolve(clasificaciones);
            })
                .on('json', (json) => {
                if (json['Nombre_grupo'] == 'F.SALA SEN-MASC DOM-TARDE GR-4') {
                    clasificaciones.push(json);
                }
            })
                .on('error', (error) => {
                console.log('Error getting Madrid ranking data.');
                reject(error);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.getRankingJSON = getRankingJSON;
function getCalendarJSON() {
    return new Promise((resolve, reject) => {
        let clasificaciones = [];
        try {
            csv({ delimiter: ";" })
                .fromStream(request.get('http://datos.madrid.es/egob/catalogo/211549-3-juegos-deportivos-actual.csv'))
                .on('done', (error) => {
                if (error)
                    reject(error);
                else
                    resolve(clasificaciones);
            })
                .on('json', (json) => {
                if (json['Codigo_equipo1'] == '123655'
                    || json['Codigo_equipo2'] == '123655') {
                    clasificaciones.push(json);
                }
            })
                .on('error', (error) => {
                console.log('Error getting Madrid ranking data.');
                reject(error);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.getCalendarJSON = getCalendarJSON;
