const { DataTypes, Sequelize } = require('sequelize')
const db = require('../db.js')

const Categories = db.define('categories',
    // Описание таблиц
    {
        id: {
            type: DataTypes.INTEGER,
			autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: true
        }
    },
    // Опции
    {
        timestamps: false
    }
)

module.exports = Categories