const graphqlFields = require('graphql-fields');

module.exports = {
    Query: {
        findUsers: async (_, {page, perPage, searchQuery, orderBy: {column, direction}}, {knex}, info) => {

            const fields = graphqlFields(info);

            page = page < 1 ? 1 : page;

            const offset = (page - 1) * perPage

            const usersQuery = knex('users')
                .where((builder) => {
                    if (searchQuery) {
                        builder
                            .where('last_name', 'like', `%${searchQuery}%`)
                            .orWhere('first_name', 'like', `%${searchQuery}%`)
                            .orWhere('middle_name', 'like', `%${searchQuery}%`);
                    }
                });

            const users = await usersQuery
                .clone()
                .limit(perPage)
                .offset(offset)
                .orderBy(column, direction);

            const nextPage = await usersQuery
                .clone()
                .limit(1)
                .offset(offset + perPage);

            const userPaginator = {
                hasMorePages: nextPage.length > 0,
                data: users,
            };

            if (!users.length) return userPaginator;

            if ('directions' in fields.data) {

                users.forEach((user) => {
                    user.directions = [];
                })

                await (async () => {

                    const userIds = users.map(user => user.id);

                    const directionables = await knex('directionables')
                        .where('directionable_type', 'users')
                        .whereIn('directionable_id', userIds);

                    if (!directionables.length) return;

                    const directionIds = directionables.map(directionable => directionable.direction_id);

                    const directions = await knex('directions').whereIn('id', directionIds);

                    if (!directions.length) return;

                    users.forEach((user) => {

                        const userDirectionables = directionables.filter(directionable => directionable.directionable_id == user.id);

                        if (!userDirectionables.length) return;

                        const userDirectionIds = userDirectionables.map(directionable => directionable.direction_id);

                        const userDirections = directions.filter(direction => userDirectionIds.includes(direction.id))

                        user.directions = userDirections;
                    });
                })();
            }

            return userPaginator;
        },
        getUser: async (_, {id}, {knex}, info) => {

            const fields = graphqlFields(info);

            const user = await knex('users').where({id}).first();

            if ('directions' in fields) {

                user.directions = [];

                await (async () => {

                    const userDirectionables = await knex('directionables')
                        .where('directionable_type', 'users')
                        .where('directionable_id', user.id);

                    if (!userDirectionables.length) return;

                    const userDirectionIds = userDirectionables.map(directionable => directionable.direction_id);

                    const userDirections = await knex('directions').whereIn('id', userDirectionIds);

                    user.directions = userDirections;
                })();
            }

            return user;
        },
    },
};
