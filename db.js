const Sequilize = require('sequelize')

module.exports = new Sequilize('salenasa', 'salenasa', '', {
    host: 'localhost',
    port: '3306',
    dialect: 'postgres'
})