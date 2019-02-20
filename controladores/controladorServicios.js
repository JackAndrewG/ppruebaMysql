'use strict';
var models = require('../Models');
var Persona = models.persona;
const uuidv4 = require('uuid/v4');
var Factura = models.factura;


class controladorTemp {


    obtenerClasificacion(req, res) {
        var clasificacion = {"clasificacion": ["comida", "vestimenta", "educacion", "salud", "otros"]};
        res.status(200).json(clasificacion);
    }

    obtenerListaTodos(req, res) {
        Factura.findAll({}).then(function (lista){
            res.status(200).json(lista);
        });
    }

    obtenerCantCompras(req, res) {
        Compra.count({col: "id_persona"}, {where: {id_persona: 5}}, {include:{model: Persona}}).then(function (cont){
            res.status(200).json({cantidad: cont});
        });
    }

    obtenerCantPersona(req, res) {
        var idProd = req.params.codigo;
        Compra.sum("total", {where: {id_persona: idPerson}}, {include:{model: Persona}}).then(function (cont) {
            res.status(200).json({cantidad: cont});
        });
    }




}

module.exports = controladorTemp;
