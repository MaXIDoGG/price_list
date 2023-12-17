const { DataTypes, Sequelize } = require('sequelize')
const db = require('../db.js')

const Products = db.define('products',
    // Описание таблиц
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: true
        },
        categoryid: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: true
        }
    },
    // Опции
    {
        timestamps: false
    }
)

module.exports = Products