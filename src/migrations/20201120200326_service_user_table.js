
exports.up = function(knex) {

    return knex.schema.createTable('serviceUser', function (table) {
        table.increments();

        table.integer('serviceId')
            .notNullable()
            .references('id')
            .inTable('services')
            .onDelete('cascade');

        table.integer('userId')
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('cascade');

        table.unique(['serviceId', 'userId']);

        table.timestamp('createdAt', {useTz: false}).defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updatedAt', {useTz: false}).defaultTo(knex.fn.now()).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('serviceUser');
};
