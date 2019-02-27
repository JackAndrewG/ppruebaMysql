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


   //obtenerSuma(req, res) {
    //    var idProd = req.params.id;
      //  Factura.sum('totalFactura', {where: {id: idProd}}, {include:{model: factura}}).then(function (cont) {
//
    //        res.status(200).json(cont);
  //      });
    //}

}

module.exports = controladorTemp;
