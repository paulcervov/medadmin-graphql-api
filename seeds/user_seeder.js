const faker = require('faker');

exports.seed = function (knex) {

    return knex('users')
        .del()
        .then(function () {

            const users = Array(50)
                .fill()
                .map(() => {
                return {
                    first_name: faker.name.firstName(),
                    patronymic: faker.name.lastName(),
                    last_name: faker.name.lastName(),
                    created_at: knex.fn.now(),
                    updated_at: knex.fn.now()
                }
            });

            return knex('users')
                .insert(users);
        });
};
