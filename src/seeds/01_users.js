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
                        dateOfIssue: faker.date.between(dateOfBirth, '2015').toISOString().split('T').shift(),
                        issuedBy: faker.lorem.sentence,
                    } : null,

                registrationAddress = faker.random.boolean()
                    ? {
                        city: faker.address.city(),
                        street: faker.address.streetName(),
                        house: faker.random.number({min: 1, max: 150}),
                        building: faker.random.boolean() ? faker.random.number({min: 1, max: 10}) : null,
                        apartment: faker.random.boolean() ? faker.random.number({min: 1, max: 100}) : null,
                        livesHere: faker.random.boolean()
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
                firstName: faker.name.firstName(genderId),
                middleName: faker.name.middleName(genderId),
                lastName: faker.name.lastName(genderId),

                email: faker.unique(faker.internet.email),
                password: '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password,

                phone: faker.unique(faker.phone.phoneNumber),

                genderId: genderId,
                dateOfBirth: dateOfBirth,
                comment: faker.random.boolean()
                    ? faker.lorem.sentence()
                    : null,

                passport: JSON.stringify(passport),
                registrationAddress: JSON.stringify(registrationAddress),
                physicalAddress: JSON.stringify(physicalAddress),

                roleId: roleId,
                percentage: roleId === 3
                    ? faker.random.arrayElement([0, 5, 10, 15, 20, 25])
                    : 0,

                createdAt: faker.date.past().toISOString().replace('T', ' ').slice(0, -5),
                updatedAt: faker.date.recent().toISOString().replace('T', ' ').slice(0, -5),
            }
        });

    return knex('users').insert(values);
};
