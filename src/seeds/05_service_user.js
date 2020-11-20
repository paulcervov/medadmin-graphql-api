
exports.seed = async (knex) => {

    await knex('service_user').del();

    const services = await knex('services').orderByRaw('RANDOM()');

    const [{userCount}] = await knex('users').count('id', {as: 'userCount'});

    const promises = services.map(async (service) => {

        const users = await knex('users').orderByRaw('RANDOM()').limit(userCount / 20);

        const values = users.map((user) => {

            return {
                service_id: service.id,
                user_id: user.id,
            };
        })

        return knex('service_user').insert(values);
    });

    return Promise.all(promises);
};
