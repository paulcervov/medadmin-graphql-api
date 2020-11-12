const faker = require('faker');

exports.seed = function (knex) {

    return knex('users')
        .del()
        .then(function () {

            const users = Array(50)
                .fill()
                .map(() => {
                return {
                    name: faker.name.findName(),
                    created_at: knex.fn.now(),
                    updated_at: knex.fn.now()
                }
            });

            return knex('users')
                .insert(users);
        });
};
