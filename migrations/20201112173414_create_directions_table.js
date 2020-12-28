
exports.up = function(knex) {

    return knex.schema.createTable('directions', function (table) {
        table.increments();

        table.string('name', 50).notNullable().unique('directionsNameUnique');

        table.timestamp('createdAt', {useTz: false}).defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updatedAt', {useTz: false}).defaultTo(knex.fn.now()).notNullable();
    });
};

exports.down = function(knex) {

    return knex.schema.dropTableIfExists('directions');
};
