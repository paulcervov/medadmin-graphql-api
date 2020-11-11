exports.seed = function (knex) {
    return knex('users')
        .del()
        .then(function () {
            return knex('users')
                .insert([
                    {
                        name: 'Paul',
                        created_at: knex.fn.now(),
                        updated_at: knex.fn.now()
                    },
                    {
                        name: 'Arthur',
                        created_at: knex.fn.now(),
                        updated_at: knex.fn.now()
                    },
                    {
                        name: 'Andrew',
                        created_at: knex.fn.now(),
                        updated_at: knex.fn.now()
                    }
                ]);
        });
};
