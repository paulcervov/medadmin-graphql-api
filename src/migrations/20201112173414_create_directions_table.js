
exports.up = function(knex) {

    return knex.schema.createTable('directions', function (table) {
        table.increments();

        table.string('name').notNullable().unique();

        table.timestamp('createdAt', {useTz: false}).defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updatedAt', {useTz: false}).defaultTo(knex.fn.now()).notNullable();
    });
};

exports.down = function(knex) {

    return knex.schema.dropTableIfExists('directions');
};
