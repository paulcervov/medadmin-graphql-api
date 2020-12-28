
exports.up = function(knex) {

    return knex.schema.createTable('users', function (table) {
        table.increments();

        table.string('firstName', 50).notNullable();
        table.string('middleName', 50).notNullable();
        table.string('lastName', 50).notNullable();

        table.string('phone', 16).notNullable().unique('usersPhoneUnique');
        table.string('password', 100).notNullable();

        table.integer('genderId').unsigned().notNullable();
        table.date('dateOfBirth').notNullable();
        table.integer('roleId').unsigned().notNullable();

        table.integer('percentage').unsigned();
        table.string('comment');
        table.json('passport');
        table.json('registrationAddress');
        table.json('physicalAddress');

        table.timestamp('deletedAt', {useTz: false});
        table.timestamp('createdAt', {useTz: false}).defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updatedAt', {useTz: false}).defaultTo(knex.fn.now()).notNullable();
    });
};

exports.down = function(knex) {

    return knex.schema.dropTableIfExists('users');
};
