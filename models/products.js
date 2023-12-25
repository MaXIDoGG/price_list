const { DataTypes, Sequelize } = require('sequelize')
const db = require('../db.js')
const Categories = require('./categories'); // Импортируем модель Categories

const Products = db.define('products', {
    // Описание таблиц
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
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    // Опции
    timestamps: false
});

// Создаем ассоциацию
Products.belongsTo(Categories, { foreignKey: 'categoryid', as: 'category' });

module.exports = Products;