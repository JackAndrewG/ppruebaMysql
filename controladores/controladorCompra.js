'use strict';
var models = require('../Models');
var Venta = models.venta;
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
  guardar(req, res) { new Venta({
      id: new mongoose.Types.ObjectId(),
      external_id: uuidv4(),
      cliente: req.body.cliente,
      marca: req.body.marca,
      color: req.body.color,
      precio: req.body.precio,
      fecha: req.body.fecha,
      parte: req.body.parte
    }).save(function(err, newVenta) {
      if (err) {
        console.log('ocurrio un error al guardar la marca');
        //req.flash('info', 'Ocurrio un error al guardar la marca', false);
      } else if (newVenta) {
        console.log('se guardo con exito la marca');
        //req.flash('info', 'Marca Guardada Exitosamente', false);
      }
      res.redirect('/Ventas');
    });
  }
  editar(req, res) { Venta.update({
        'external_id': req.body.external
      }, {
        $set: {
          cliente: req.body.cliente,
          marca: req.body.marca,
          color: req.body.color,
          precio: req.body.precio,
          fecha: req.body.fecha,
          parte: req.body.parte
        }
      },
      (err, venta) => {
        if (err) {
          //req.flash('info', 'No se pudo modificar', false);
        } else if (venta) {
          //req.flash('info', 'Se modifico con exito', false);
        }
        res.redirect('/ventas');
      });
  }
}

module.exports = controladorVenta;
