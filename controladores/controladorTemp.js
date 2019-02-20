'use strict';
var models = require('../Models');
var Persona = models.persona;
const uuidv4 = require('uuid/v4');

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

}

module.exports = controladorTemp;
