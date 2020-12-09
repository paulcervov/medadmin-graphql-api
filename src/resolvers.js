const graphqlFields = require('graphql-fields');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const {ID_ROLE_DOCTOR} = require('./constants/User');

module.exports = {
    Query: {
        findEmployers: async (_, {first, offset, searchQuery, orderBy: {column, direction}, trashed}, context, info) => {

            const fields = graphqlFields(info);

            const employerQuery = User.query()
                .orderBy(column, direction);

            if(trashed === 'WITHOUT') {
                employerQuery.modify('withoutTrashed');
            }

            if(trashed === 'ONLY') {
                employerQuery.modify('onlyTrashed');
            }

            if (searchQuery) {
                employerQuery
                    .where('lastName', 'like', `%${searchQuery}%`)
                    .orWhere('firstName', 'like', `%${searchQuery}%`)
                    .orWhere('middleName', 'like', `%${searchQuery}%`);
            }

            if ('directions' in fields) {
                employerQuery.withGraphFetched('directions')
            }

            return employerQuery.limit(first).offset(offset);

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

            if(input.roleId !== ID_ROLE_DOCTOR) {
                input.percentage = null;
            }

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
        restoreEmployer: async (_, {id}) => {

            const employer = await User.query().patchAndFetchById(id, {deletedAt: null});

            return {
                success: true,
                message: 'Сотрудник был восстановлен',
                employer
            }
        },
    },
    MutationResponse: {
        __resolveType() {
            return null;
        }
    }
};
