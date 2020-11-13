const faker = require('./../faker');

exports.seed = async (knex) => {

    await knex('users').del();

    const values = Array(50)
        .fill()
        .map(() => {

            const gender = faker.random.number(1);

            return {
                first_name: faker.name.firstName(gender),
                middle_name: faker.name.middleName(gender),
                last_name: faker.name.lastName(gender),

                email: faker.unique(faker.internet.email),
                password: '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password,

                phone: faker.unique(faker.phone.phoneNumber),

                role_id: faker.random.number({min: 1, max: 5}),
                percentage: faker.random.arrayElement([0, 5, 10, 15, 20, 25]),

                created_at: knex.fn.now(),
                updated_at: knex.fn.now()
            }
        });

    return knex('users').insert(values);
};
