require('dotenv').config();

module.exports = {
    client: 'pg',
    connection: process.env.DB_URL || {
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    },
};
