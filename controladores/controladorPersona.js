'use strict';
var models = require('../Models');
var Persona = models.persona;
const uuidv4 = require('uuid/v4');

class controladorParte{

  listar(req, res) {
    Persona.findAll({where: {estado: true}}).then(function (personas) {
      res.render('plantilla', {
        titulo: 'Personas',
        fragmento: 'fragmentos/frmPersonas',
        listado: personas
        //listaPartes: partes,
      });
    }).catch(function (err) {
                console.log("Error:", err);
                //req.flash('error', 'Hubo un error');
                res.redirect('/');
            });
  }

  guardar(req, res){
        Persona.create({
          external_id: uuidv4(),
          nombre: req.body.nombre,
          cedula: req.body.cedula,
          apellido: req.body.apellido,
          nombre: req.body.nombre,
          direccion: req.body.direccion,
          telefono: req.body.telefono
        }).then(function(newPersona, created){
            if (newPersona) {
              //req.flash('info', 'Registro exitoso', false);
              console.log('registro exitoso');
              //res.redirect('/registro');
            }
            });
          res.redirect('/personas');
      }

    }

module.exports=controladorParte;
