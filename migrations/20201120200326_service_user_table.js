
exports.up = function(knex) {

    return knex.schema.createTable('serviceUser', function (table) {
        table.increments();

        table.integer('serviceId')
            .unsigned()
            .notNullable();

        table.foreign('serviceId', 'serviceUserServiceIdForeign')
            .references('id')
            .inTable('services')
            .onDelete('cascade');

        table.integer('userId')
            .unsigned()
            .notNullable();

        table.foreign('userId', 'serviceUserUserIdForeign')
            .references('id')
            .inTable('users')
            .onDelete('cascade');

        table.unique(['serviceId', 'userId'], 'serviceUserServiceIdUserIdUnique');

        table.timestamp('createdAt', {useTz: false}).defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updatedAt', {useTz: false}).defaultTo(knex.fn.now()).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('serviceUser');
};
