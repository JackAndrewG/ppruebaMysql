module.exports = function (sequelize, Sequelize) {
    var Factura = sequelize.define('factura', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        external_id: {
            type: Sequelize.UUID
        },
        nombre: {
            type: Sequelize.STRING(100)
        },
        clasificacion: {
            type: Sequelize.STRING(100)
        },
        cantidad: {
            type: Sequelize.STRING(100)
        },
        totalFactura: {
            type: Sequelize.DOUBLE(10,2)
        },
        estado: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }

    }, {freezeTableName: true,
        createdAt: 'fecha_registro',
        updateAt: 'fecha_modificacion'
    });


    return Factura;
};
