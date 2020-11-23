
exports.up = function(knex) {

    return knex.schema.createTable('users', function (table) {
        table.increments();

        table.string('firstName').notNullable();
        table.string('middleName').notNullable();
        table.string('lastName').notNullable();

        table.string('email').notNullable().unique();
        table.string('password').notNullable();

        table.string('phone').notNullable().unique();

        table.integer('genderId').notNullable();
        table.date('dateOfBirth').notNullable();
        table.string('comment');

        table.json('passport');
        table.json('registrationAddress');
        table.json('physicalAddress');

        table.integer('roleId').notNullable();
        table.integer('percentage').notNullable();

        table.timestamp('createdAt', {useTz: false}).defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updatedAt', {useTz: false}).defaultTo(knex.fn.now()).notNullable();
    });
};

exports.down = function(knex) {

    return knex.schema.dropTableIfExists('users');
};
