var express = require('express');
var router = express.Router();
var persona=require('../controladores/controladorPersona');
var controladorPersona=new persona();
var compra=require('../controladores/controladorCompra');
var controladorCompra=new compra();

var foto=require('../controladores/controladorTemp');
var controladorFoto=new foto();
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('plantilla', { titulo: 'Ropa', fragmento: 'fragmentos/frmInicio'});
});

router.get('/registro', function(req, res, next) {
    res.render('plantilla', { titulo: 'Registro de Partes', fragmento: 'fragmentos/frmRegistro'});
});
router.post('/registrar', controladorPersona.guardar);

//lista todas las ventas
router.get('/ventas', controladorCompra.listar);
//guarda una nueva venta
router.post('/guardarVenta', controladorCompra.guardar);
//edita una venta existente
router.post('/editarVenta', controladorCompra.editar);


//lista todas las personas
router.get('/personas', controladorPersona.listar);
//guarda una nueva foto
router.post('/persona/foto', controladorFoto.guardarFoto);
module.exports = router;
