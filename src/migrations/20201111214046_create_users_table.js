
exports.up = function(knex) {

    return knex.schema.createTable('users', function (table) {
        table.increments();

        table.string('first_name').notNullable();
        table.string('middle_name').notNullable();
        table.string('last_name').notNullable();

        table.string('email').notNullable().unique();
        table.string('password').notNullable();

        table.string('phone').notNullable().unique();

        table.integer('gender_id').notNullable();
        table.date('date_of_birth').notNullable();
        table.string('comment');

        table.json('passport');
        table.json('registration_address');
        table.json('physical_address');

        table.integer('role_id').notNullable();
        table.integer('percentage').notNullable();

        table.timestamps(true, true);
    });
};

exports.down = function(knex) {

    return knex.schema.dropTableIfExists('users');
};
