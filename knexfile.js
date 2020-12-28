require('dotenv').config();

module.exports = {
    client: 'mysql',
    connection: process.env.DB_URL || {
        database: process.env.DB_DATABASE,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        charset: 'utf8mb4',
    },
};
