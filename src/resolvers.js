const graphqlFields = require('graphql-fields');

module.exports = {
    Query: {
        findUsers: async (_, {searchQuery, orderBy: {column, direction}}, {knex}, info) => {

            const fields = graphqlFields(info);

            const users = await knex('users')
                .where((builder) => {
                    if (searchQuery) {
                        builder
                            .where({last_name: searchQuery})
                            .orWhere({first_name: searchQuery})
                            .orWhere({middle_name: searchQuery});
                    }
                })
                .orderBy(column, direction);

            if('directions' in fields) {

                const userIds = users.map(user => user.id);

                const directionables = await knex('directionables')
                    .where('directionable_type', 'users')
                    .whereIn('directionable_id', userIds);

                if(!directionables) {
                    return users;
                }

                const directionIds = directionables.map(directionable => directionable.direction_id);

                const directions = await knex('directions').whereIn('id', directionIds);

                if(!directions) {
                    return users;
                }

                users.forEach((user) => {

                    const userDirectionables = directionables.filter(directionable => directionable.directionable_id == user.id);

                    if(!userDirectionables) {
                        return;
                    }

                    const userDirectionIds = userDirectionables.map(directionable => directionable.direction_id);

                    const userDirections = directions.filter(direction => userDirectionIds.includes(direction.id))

                    if(!userDirections) {
                        return;
                    }

                    user.directions = userDirections;
                });
            }

            return users;
        },
        getUser: async (_, {id}, {knex}) => {

            const user =  await knex('users').where({id}).first();

            return user;
        },
    },
};
