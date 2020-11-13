
exports.up = function(knex) {

    return knex.schema.createTable('users', function (table) {
        table.increments();

        table.string('first_name').notNullable();
        table.string('patronymic').notNullable();
        table.string('last_name').notNullable();

        table.string('email').notNullable().unique();
        table.string('password').notNullable();

        table.string('phone').notNullable().unique();

        table.integer('role_id').notNullable();
        table.integer('percentage').notNullable();

        table.timestamps();
    });
};

exports.down = function(knex) {

    return knex.schema.dropTableIfExists('users');
};
