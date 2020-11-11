require('dotenv').config();

module.exports = {

  development: {
    client: 'sqlite3',
    connection: () => ({
      filename: process.env.DB_DATABASE || './database/database.sqlite'
    }),
    useNullAsDefault: true
  },

  production: {
    client: 'postgresql',
    connection: () => ({
      database: process.env.DB_DATABASE,
      user:     process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    }),
    pool: {
      min: 2,
      max: 10
    },
  }

};
