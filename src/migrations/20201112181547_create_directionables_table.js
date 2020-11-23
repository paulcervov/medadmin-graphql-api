
exports.up = function(knex) {

    return knex.schema.createTable('directionables', function (table) {
        table.increments();

        table.integer('directionId')
            .notNullable()
            .references('id')
            .inTable('directions')
            .onDelete('cascade');

        table.string('directionableType').notNullable();
        table.integer('directionableId').notNullable().unsigned();

        table.unique(['directionId', 'directionableType', 'directionableId']);
        table.index(['directionableType', 'directionableId']);

        table.timestamp('createdAt', {useTz: false}).defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updatedAt', {useTz: false}).defaultTo(knex.fn.now()).notNullable();
    });
};

exports.down = function(knex) {

    return knex.schema.dropTableIfExists('directionables');
};
