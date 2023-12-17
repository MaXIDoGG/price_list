const { DataTypes, Sequelize } = require('sequelize')
const db = require('../db.js')

const Admins = db.define('admins',
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
        nickname: {
            type: DataTypes.STRING(30),
            allowNull: true
        },
        password: {
            type: DataTypes.STRING(30),
            allowNull: true
        },
        
    },
    // Опции
    {
        timestamps: false
    }
)

module.exports = Admins