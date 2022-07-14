const knex = require('knex')
const config = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'desafiobackdb'
    },
    pool: { min: 0, max: 7 }
}
const configSQL3 = {
    client: 'sqlite3',
    connection: { filename: `${__dirname}/ecommerce/mysql.sqlite`, },
    useNullAsDefault: true
}
const databaseConnection = knex(config)
const databaseConnectionSQL3 = knex(configSQL3)
module.exports = { databaseConnection, databaseConnectionSQL3 }