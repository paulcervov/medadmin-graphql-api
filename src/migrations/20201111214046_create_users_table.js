
exports.up = function(knex) {

    return knex.schema.createTable('users', function (table) {
        table.increments();

        table.string('firstName').notNullable();
        table.string('middleName').notNullable();
        table.string('lastName').notNullable();

        table.string('phone').notNullable().unique();
        table.string('password').notNullable();

        table.integer('genderId').notNullable();
        table.date('dateOfBirth').notNullable();
        table.integer('roleId').notNullable();

        table.integer('percentage');
        table.string('comment');
        table.json('passport');
        table.json('registrationAddress');
        table.json('physicalAddress');

        table.timestamp('createdAt', {useTz: false}).defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updatedAt', {useTz: false}).defaultTo(knex.fn.now()).notNullable();
    });
};

exports.down = function(knex) {

    return knex.schema.dropTableIfExists('users');
};
