module.exports = {
    Query: {
        findEmployers: async (_, {searchQuery, orderBy: {column, direction}}, {knex}) => {

            const employers = await knex('users')
                .where((builder) => {
                    if (searchQuery) {
                        builder
                            .where({last_name: searchQuery})
                            .orWhere({first_name: searchQuery})
                            .orWhere({middle_name: searchQuery});
                    }
                })
                .orderBy(column, direction);

            return employers;
        },
        getEmployer: async (_, {id}, {knex}) => {

            const employer =  await knex('users').where({id}).first();

            return employer;
        },
    },
};
