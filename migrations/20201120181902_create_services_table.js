
exports.up = function(knex) {

    return knex.schema.createTable('services', function (table) {
        table.increments();

        table.string('name').notNullable().unique('servicesNameUnique');

        table.timestamp('createdAt', {useTz: false}).defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updatedAt', {useTz: false}).defaultTo(knex.fn.now()).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('services');
};
