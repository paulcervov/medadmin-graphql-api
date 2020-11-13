const faker = require('faker');

exports.seed = async (knex) => {

    await knex('users').del();

    const values = Array(50)
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

    return knex('users').insert(values);
};
