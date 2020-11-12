const faker = require('faker');
const {capitalize} = require('lodash');

exports.seed = function(knex) {

  return knex('directions').del()
    .then(function () {

        const directions = Array(10)
            .fill()
            .map(() => {

                return {
                    name: capitalize(faker.unique(faker.lorem.word)),
                    created_at: knex.fn.now(),
                    updated_at: knex.fn.now()
                }
            });

      return knex('directions').insert(directions);
    });
};
