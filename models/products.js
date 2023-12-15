const { DataTypes, Sequelize } = require('sequelize')
const db = require('../db.js')

const Products = db.define('products',
    // Описание таблиц
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        category: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        price: {
            type: DataTypes.NUMBER,
            allowNull: true
        }
    },
    // Опции
    {
        timestamps: false
    }
)

module.exports = Products