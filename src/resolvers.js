const graphqlFields = require('graphql-fields');
const User = require('./models/User');

module.exports = {
    Query: {
        findEmployers: async (_, {page, perPage, searchQuery, orderBy: {column, direction}}, context, info) => {

            const fields = graphqlFields(info);

            const userQuery = User.query()
                .orderBy(column, direction);

            if (searchQuery) {
                userQuery
                    .where('lastName', 'like', `%${searchQuery}%`)
                    .orWhere('firstName', 'like', `%${searchQuery}%`)
                    .orWhere('middleName', 'like', `%${searchQuery}%`);
            }

            if('directions' in fields.data) {
                userQuery.withGraphFetched('directions')
            }

            const {results, total} = await userQuery.page(page - 1, perPage);

            return {
                currentPage: page,
                hasMorePages: (((page - 1) * perPage) + perPage) < total ,
                data: results,
            };

        },
        getEmployer: async (_, {id}, context, info) => {

            const fields = graphqlFields(info);

            const userQuery = User.query();

            if ('directions' in fields) {
                userQuery.withGraphFetched('directions');
            }

            const user = await userQuery.findById(id)

            return user;
        },
    },
};
