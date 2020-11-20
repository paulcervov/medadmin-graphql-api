
exports.up = function(knex) {

    return knex.schema.createTable('service_user', function (table) {
        table.increments();

        table.integer('service_id')
            .notNullable()
            .references('id')
            .inTable('services')
            .onDelete('cascade');

        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('cascade');

        table.unique(['service_id', 'user_id']);

        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('service_user');
};
