'use strict';
var models = require('../Models');
var Persona = models.persona;
const uuidv4 = require('uuid/v4');
var Compra = models.compra;

//Para cargar imagenes
var fs=require('fs');
var maxFileSize=1*1024*1024;
var extensiones=['jpg','png'];
var formidable=require('formidable');

class controladorTemp {

  //Para cargar imagenes
    guardarFoto(req, res) {
      console.log(req.body.foto);
      var form=new formidable.IncomingForm();
      form.parse(req, function(err, fields, files){
        console.log('hola');
        if (files.foto.size <= maxFileSize) {
          var extension = files.foto.name.split('.').pop().toLowerCase();
          if (extensiones.includes(extension)) {
            var nombre = fields.external+'.'+extension;
            fs.rename(files.foto.path, 'public/imagenes/'+nombre, function(err){
              if (err) {
                 console.log('OCURRIO UN ERROR: '+err);
              }
              Persona.update({
                foto: nombre
              },{where:{external_id:fields.external}}).then(function(updatedVino, created){
                if (updatedVino) {
                  req.flash('info', 'Se ha subido correctamente');
                  console.log('Se ha subido correctamente');
                  res.redirect('/personas');
                }
              });
            });
          }else{
            controladorTemp.eliminar(files.foto.path);
            req.flash('err', 'Error de Extension', false);
            res.redirect('/personas');
            console.log('error de extension');
          }
        }else {
          controladorTemp.eliminar(files.foto.path);
          req.flash('err', 'El archivo es demasiado pesado'+ maxFileSize, false);
          res.redirect('/personas');
          console.log('error de tamaño de archivo'+maxFileSize);
        }
      });
    }

    static eliminar(link){
      fs.exists(link, function(exists){
        if (exists) {
          console.log('Eliminando archivos existentes');
          fs.unlinkSync(link);
        }else {
          console.log('No se pudo borrar '+link);
        }
      });
    }



    obtenerMarcas(req, res) {
        var marcas = {"marcas": ["Nissan", "Mercedes", "KIA", "Chevrolet", "Toyota", "Hyundai"]};
        res.status(200).json(marcas);
    }
    obtenerColores(req, res) {
        var marcas = req.query.marcas;
        var colores = {"Nissan": ["Rojo", "Amarillo", "Azul"],
            "Mercedes": ["Amarillo", "Verde", "Gris", "Blanco"],
            "Chevrolet": ["Amarillo", "Azul", "Gris", "Verde"],
            "Toyota": ["Negro", "Gris", "Blanco"],
            "Hyundai": ["Morado", "Naranja", "Gris", "Blanco"],
            "KIA": ["Rojo", "Verde", "Azul", "Celeste", "Blanco"]};
        res.status(200).json(colores[marcas]);
    }
    obtenerListaTodos(req, res) {
        Compra.findAll({}).then(function (lista){
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
