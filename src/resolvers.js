const graphqlFields = require('graphql-fields');
const User = require('./models/User');
const bcrypt = require('bcrypt');

module.exports = {
    Query: {
        findEmployers: async (_, {page, perPage, searchQuery, orderBy: {column, direction}}, context, info) => {

            const fields = graphqlFields(info);

            const employerQuery = User.query()
                .orderBy(column, direction);

            if (searchQuery) {
                employerQuery
                    .where('lastName', 'like', `%${searchQuery}%`)
                    .orWhere('firstName', 'like', `%${searchQuery}%`)
                    .orWhere('middleName', 'like', `%${searchQuery}%`);
            }

            if ('directions' in fields.data) {
                employerQuery.withGraphFetched('directions')
            }

            const {results, total} = await employerQuery.page(page - 1, perPage);

            return {
                currentPage: page,
                hasMorePages: (((page - 1) * perPage) + perPage) < total,
                data: results,
            };

        },
        getEmployer: (_, {id}, context, info) => {

            const fields = graphqlFields(info);

            const employerQuery = User.query();

            if ('directions' in fields) {
                employerQuery.withGraphFetched('directions');
            }

            return employerQuery.findById(id);
        },
    },
    Mutation: {
        createEmployer: async (_, {input}) => {

            const hash = await bcrypt.hash('password', 1);

            input = {...input, password: hash};

            const employer = await User.query().insert(input);

            return {
                success: true,
                message: 'Сотрудник был создан',
                employer
            }
        },
        updateEmployer: async (_, {id, input}) => {

            const employer = await User.query().updateAndFetchById(id, input);

            return {
                success: true,
                message: 'Сотрудник был обновлен',
                employer
            }
        },
        deleteEmployer: async (_, {id}) => {

            const now = new Date()
                .toISOString()
                .replace('T', ' ')
                .slice(0, -5);

            const employer = await User.query().patchAndFetchById(id, {deletedAt: now});

            return {
                success: true,
                message: 'Сотрудник был удален',
                employer
            }
        },
    }
};
