const knex = require('knex')

const db = knex({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: process.env.DB_USERNAME ?? 'root',
        password: process.env.DB_PASSWORD ?? 'root',
        database: process.env.DB_NAME ?? 'pernikahan'
    }
});

module.exports = db