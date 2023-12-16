const { DataTypes, Sequelize } = require('sequelize')
const db = require('../db.js')

const Products = db.define('Products',
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
        categoryId: {
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