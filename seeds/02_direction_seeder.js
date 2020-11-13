const faker = require('faker');
const {capitalize} = require('lodash');

exports.seed = async (knex) => {

    await knex('directions').del();

    const values = Array(10)
        .fill()
        .map(() => {

            return {
                name: capitalize(faker.unique(faker.lorem.word)),
                created_at: knex.fn.now(),
                updated_at: knex.fn.now()
            }
        });

    return knex('directions').insert(values);
};
