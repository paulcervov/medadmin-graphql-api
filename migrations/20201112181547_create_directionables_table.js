
exports.up = function(knex) {
    return knex.schema.createTable('directionables', function (table) {
        table.increments();

        table.integer('direction_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('directions')
            .onDelete('cascade');

        table.string('directionable_type').notNullable();
        table.integer('directionable_id').notNullable().unsigned();

        table.unique(['direction_id', 'directionable_type', 'directionable_id']);
        table.index(['directionable_type', 'directionable_id']);

        table.timestamps();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('directionables');
};
