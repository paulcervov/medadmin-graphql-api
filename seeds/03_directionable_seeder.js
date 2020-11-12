exports.seed = async function (knex) {

    await knex('directionables').del();

    const directions = await knex.select('id').from('directions').orderByRaw('RANDOM()');

    const [{userCount}] = await knex('users').count('id', {as: 'userCount'});

    const promises = directions.map(async (direction) => {

        const users = await knex.select('id').from('users').orderByRaw('RANDOM()').limit(userCount / 5);

        return knex('directionables').insert(users.map((user) => {

            return {
                direction_id: direction.id,
                directionable_id: user.id,
                directionable_type: 'users',
                created_at: knex.fn.now(),
                updated_at: knex.fn.now(),
            };
        }));
    });

    return Promise.all(promises);
};
