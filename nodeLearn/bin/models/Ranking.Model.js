"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// grab the things we need
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
var RankingSchema = new mongoose_1.Schema({
    Codigo_competicion: String,
    Codigo_equipo: String,
    Codigo_fase: String,
    Codigo_grupo: String,
    Codigo_temporada: String,
    Goles_contra: String,
    Goles_favor: String,
    Nombre_categoria: String,
    Nombre_competicion: String,
    Nombre_deporte: String,
    Nombre_distrito: String,
    Nombre_equipo: String,
    Nombre_fase: String,
    Nombre_grupo: String,
    Nombre_temporada: String,
    Partidos_empatados: String,
    Partidos_ganados: String,
    Partidos_jugados: String,
    Partidos_perdidos: String,
    Posicion: String,
    Puntos: String,
});
// the schema is useless so far
// we need to create a model using it
exports.rankingModel = mongoose.model('Ranking', RankingSchema);
