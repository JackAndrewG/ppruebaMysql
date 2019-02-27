var express = require('express');
var router = express.Router();
var factura=require('../controladores/controladorFactura');
var controladorfactura=new factura();

var servicios=require('../controladores/controladorservicios');
var controladorservicios=new servicios();
/* GET home pages. */
router.get('/', function(req, res, next) {
    res.render('plantilla', { titulo: 'Ropa', fragmento: 'fragmentos/frmInicio'});
});


//lista todas las ventas
router.get('/facturas', controladorfactura.listar);
//guarda una nueva venta
router.post('/guardarFactura', controladorfactura.guardar);
//edita una venta existente
router.post('/editarFactura', controladorfactura.editar);


//lista todas las personas


router.get('/facturas/buscar', controladorfactura.buscar);

//RECURSOS WEB
router.get('/facturas/recursos/clasificacion', controladorservicios.obtenerClasificacion);

router.get('/facturas/recursos/listarTodos', controladorservicios.obtenerListaTodos);
//router.get('/facturas/recursos/totales/:id', controladorservicios.obtenerSuma);
module.exports = router;
