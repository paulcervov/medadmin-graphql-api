const faker = require('../faker');
const {capitalize} = require('lodash');

exports.seed = async (knex) => {

    await knex('services').del();

    const values = Array(50)
        .fill()
        .map(() => {
            return {
                name: capitalize(faker.lorem.words(faker.random.number({min: 2, max: 4}))),
                createdAt: faker.date.past().toISOString().replace('T', ' ').slice(0, -5),
                updatedAt: faker.date.recent().toISOString().replace('T', ' ').slice(0, -5)
            }
        })

    return knex('services').insert(values);
};
