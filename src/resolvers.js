const graphqlFields = require('graphql-fields');

module.exports = {
    Query: {
        findEmployers: async (_, {page, perPage, searchQuery, orderBy: {column, direction}}, {knex}, info) => {

            const fields = graphqlFields(info);

            page = page < 1 ? 1 : page;

            const offset = (page - 1) * perPage

            const employers = await knex('users')
                .where((builder) => {
                    if (searchQuery) {
                        builder
                            .where('last_name', 'like', `%${searchQuery}%`)
                            .orWhere('first_name', 'like', `%${searchQuery}%`)
                            .orWhere('middle_name', 'like', `%${searchQuery}%`);
                    }
                })
                .offset(offset)
                .limit(perPage + 1)
                .orderBy(column, direction);

                const hasMorePages = employers.length > perPage;

                employers.splice(perPage);

            const employerPaginator = {
                currentPage: page,
                hasMorePages,
                data: employers,
            };

            if (!employers.length) return employerPaginator;

            if ('directions' in fields.data) {

                employers.forEach((employer) => {
                    employer.directions = [];
                })

                await (async () => {

                    const employerIds = employers.map(employer => employer.id);

                    const directionables = await knex('directionables')
                        .where('directionable_type', 'User')
                        .whereIn('directionable_id', employerIds);

                    if (!directionables.length) return;

                    const directionIds = directionables.map(directionable => directionable.direction_id);

                    const directions = await knex('directions').whereIn('id', directionIds);

                    if (!directions.length) return;

                    employers.forEach((employer) => {

                        const employerDirectionables = directionables.filter(directionable => directionable.directionable_id == employer.id);

                        if (!employerDirectionables.length) return;

                        const employerDirectionIds = employerDirectionables.map(directionable => directionable.direction_id);

                        const employerDirections = directions.filter(direction => employerDirectionIds.includes(direction.id))

                        employer.directions = employerDirections;
                    });
                })();
            }

            return employerPaginator;
        },
        getEmployer: async (_, {id}, {knex}, info) => {

            const fields = graphqlFields(info);

            const employer = await knex('users').where({id}).first();

            if ('directions' in fields) {

                employer.directions = [];

                await (async () => {

                    const employerDirectionables = await knex('directionables')
                        .where('directionable_type', 'User')
                        .where('directionable_id', employer.id);

                    if (!employerDirectionables.length) return;

                    const employerDirectionIds = employerDirectionables.map(directionable => directionable.direction_id);

                    const employerDirections = await knex('directions').whereIn('id', employerDirectionIds);

                    employer.directions = employerDirections;
                })();
            }

            return employer;
        },
    },
};
