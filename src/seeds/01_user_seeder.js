const faker = require('../faker');

exports.seed = async (knex) => {

    await knex('users').del();

    const values = Array(50)
        .fill()
        .map(() => {

            const
                genderId = faker.random.number(1),
                dateOfBirth = faker.date.between('1950', '2010').toISOString().split('T').shift(),
                roleId = faker.random.number({min: 1, max: 5}),

                passport = faker.random.boolean()
                    ? {
                        series: faker.helpers.replaceSymbols('####'),
                        number: faker.helpers.replaceSymbols('######'),
                        date_of_issue: faker.date.between(dateOfBirth, '2015').toISOString().split('T').shift(),
                        issued_by: faker.lorem.sentence,
                    } : null,

                registrationAddress = faker.random.boolean()
                    ? {
                        city: faker.address.city(),
                        street: faker.address.streetName(),
                        house: faker.random.number({min: 1, max: 150}),
                        building: faker.random.boolean() ? faker.random.number({min: 1, max: 10}) : null,
                        apartment: faker.random.boolean() ? faker.random.number({min: 1, max: 100}) : null,
                        lives_here: faker.random.boolean()
                    }
                    : null,

                physicalAddress = registrationAddress === null
                    ? null
                    : faker.random.boolean()
                        ? {
                            city: faker.address.city(),
                            street: faker.address.streetName(),
                            house: faker.random.number({min: 1, max: 150}),
                            building: faker.random.boolean() ? faker.random.number({min: 1, max: 10}) : null,
                            apartment: faker.random.boolean() ? faker.random.number({min: 1, max: 100}) : null
                        }
                        : null;

            return {
                first_name: faker.name.firstName(genderId),
                middle_name: faker.name.middleName(genderId),
                last_name: faker.name.lastName(genderId),

                email: faker.unique(faker.internet.email),
                password: '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password,

                phone: faker.unique(faker.phone.phoneNumber),

                gender_id: genderId,
                date_of_birth: dateOfBirth,
                comment: faker.random.boolean()
                    ? faker.lorem.sentence()
                    : null,

                passport: JSON.stringify(passport),
                registration_address: JSON.stringify(registrationAddress),
                physical_address: JSON.stringify(physicalAddress),

                role_id: roleId,
                percentage: roleId === 3
                    ? faker.random.arrayElement([0, 5, 10, 15, 20, 25])
                    : 0,

                created_at: faker.date.past(),
                updated_at: faker.date.recent(),
            }
        });

    return knex('users').insert(values);
};
