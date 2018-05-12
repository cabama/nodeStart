"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// grab the things we need
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
var calendarSchema = new mongoose_1.Schema({
    Codigo_temporada: String,
    Codigo_competicion: String,
    Codigo_fase: String,
    Codigo_grupo: String,
    Jornada: String,
    Partido: String,
    Codigo_equipo1: String,
    Codigo_equipo2: String,
    Resultado1: String,
    Resultado2: String,
    Codigo_campo: String,
    Date: Date,
    Fecha: String,
    Hora: String,
    Programado: String,
    Estado: String,
    Nombre_temporada: String,
    Nombre_competicion: String,
    Nombre_fase: String,
    Nombre_grupo: String,
    Nombre_deporte: String,
    Nombre_categoria: String,
    Nombre_jornada: String,
    Equipo_local: String,
    Equipo_visitante: String,
    Campo: String,
    Sexo_grupo: String,
    Distrito: String,
    Observaciones: String,
    SISTEMA_COMPETICION: String,
    COORD_X_CAMPO: String,
    COORD_Y_CAMPO: String
});
// the schema is useless so far
// we need to create a model using it
exports.calendarModel = mongoose.model('Calendar', calendarSchema);
