const Sequilize = require('sequelize')

module.exports = new Sequilize("postgresql://maks.nasonov.03:4bKdyM3zXASe@ep-sweet-brook-09241647.eu-central-1.aws.neon.tech/interfaces?sslmode=require")
//     'interfaces', 'maks.nasonov.03', '4bKdyM3zXASe', {
//     host: 'ep-sweet-brook-09241647.eu-central-1.aws.neon.tech',
//     dialect: 'postgres',
//     sslmode: "require"
// }


// # Do not expose your Neon credentials to the browser

// PGHOST='ep-sweet-brook-09241647.eu-central-1.aws.neon.tech'
// PGDATABASE='interfaces'
// PGUSER='maks.nasonov.03'
// PGPASSWORD='4bKdyM3zXASe'