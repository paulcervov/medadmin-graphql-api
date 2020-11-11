const knex = require('./knex')

knex('users')
    .then((rows) => {
    console.log(rows);
}).catch((err) => {
    console.error(err);
}).finally(async () => {
    knex.destroy(() => {});
});
