'use strict';
var models = require('../Models');
var Compra = models.compra;
const uuidv4 = require('uuid/v4');

class controladorVenta {
  listar(req, res) {
    Compra.findAll({}).then(function (compras) {
      res.render('plantilla', {
        titulo: 'Venta de Partes',
        fragmento: 'fragmentos/frmVentas',
        //listado: listaV,
        //listaPartes: partes,
      });
    }).catch(function (err) {
                console.log("Error:", err);
                //req.flash('error', 'Hubo un error');
                res.redirect('/destinos');
            });
  }
  guardar(req, res) {
      Compra.create({
      external_id: uuidv4(),
      pagoTarjeta: req.body.tarjeta,
      total: req.body.total
    }).then(function (compra, created) {
      if (compra) {
        console.log('se guardo con exito la compra');
        //req.flash('info', 'Marca Guardada Exitosamente', false);
      }
      res.redirect('/Ventas');
    });
  }
  editar(req, res) {
    Compra.update({
    pagoTarjeta: req.body.tarjeta,
    total: req.body.total}, {where: {external_id: external}}).then(function (updatedCompra, created) {
        if (updatedCompra) {
          //req.flash('info', 'No se pudo modificar', false);
          console.log('error al update');
        }
        res.redirect('/ventas');
      });
  }
}

module.exports = controladorVenta;
