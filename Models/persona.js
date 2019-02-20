module.exports = function (sequelize, Sequelize) {
    var Persona = sequelize.define('persona', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        external_id: {
            type: Sequelize.UUID
        },
        cedula: {
            type: Sequelize.STRING(10),
            allowNull: false,
            unique: true
        },
         apellido: {
            type: Sequelize.STRING(50)
        },
        nombre: {
            type: Sequelize.STRING(50)
        },
        direccion: {
            type: Sequelize.STRING()
        },
        telefono: {
            type: Sequelize.STRING(15)
        },
        foto: {
            type: Sequelize.STRING(100)
        },
        estado: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }

    }, {freezeTableName: true,
        createdAt: 'fecha_registro',
        updateAt: 'fecha_modificacion'
    });



    Persona.associate = function (models) {
        models.persona.hasMany(models.compra, {
            foreignKey: 'id_persona'
        });
    };


    return Persona;
};
