
exports.up = function(knex) {

    return knex.schema.createTable('directions', function (table) {
        table.increments();

        table.string('name').notNullable().unique();

        table.timestamps(true, true);
    });
};

exports.down = function(knex) {

    return knex.schema.dropTableIfExists('directions');
};
