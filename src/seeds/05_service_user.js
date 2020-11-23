
exports.seed = async (knex) => {

    await knex('serviceUser').del();

    const services = await knex('services').orderByRaw('RANDOM()');

    const [{userCount}] = await knex('users').count('id', {as: 'userCount'});

    const promises = services.map(async (service) => {

        const users = await knex('users').orderByRaw('RANDOM()').limit(userCount / 20);

        const values = users.map((user) => {

            return {
                serviceId: service.id,
                userId: user.id,
            };
        })

        return knex('serviceUser').insert(values);
    });

    return Promise.all(promises);
};
