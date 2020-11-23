
exports.seed = async (knex) => {

    await knex('directionables').del();

    const directions = await knex('directions').orderByRaw('RANDOM()');

    const [{userCount}] = await knex('users').count('id', {as: 'userCount'});

    const promises = directions.map(async (direction) => {

        const users = await knex('users').orderByRaw('RANDOM()').limit(userCount / 20);

        const values = users.map((user) => {

            return {
                directionId: direction.id,
                directionableId: user.id,
                directionableType: 'User',
            };
        })

        return knex('directionables').insert(values);
    });

    return Promise.all(promises);
};
