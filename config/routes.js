var express = require('express');
var router = express.Router();
var factura=require('../controladores/controladorFactura');
var controladorfactura=new factura();

var servicios=require('../controladores/controladorservicios');
var controladorservicios=new servicios();
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('plantilla', { titulo: 'Ropa', fragmento: 'fragmentos/frmInicio'});
});


//lista todas las ventas
router.get('/facturas', controladorfactura.listar);
//guarda una nueva venta
router.post('/guardarFactura', controladorfactura.guardar);
//edita una venta existente
router.post('/editarVenta', controladorfactura.editar);


//lista todas las personas


router.get('/buscar', controladorfactura.listar);

//RECURSOS WEB
router.get('/facturas/recursos/clasificacion', controladorservicios.obtenerClasificacion);

router.get('/facturas/recursos/listarTodos', controladorservicios.obtenerListaTodos);
router.get('/ventas/recursos/totales/:codigo', controladorservicios.obtenerCantPersona);


module.exports = router;
