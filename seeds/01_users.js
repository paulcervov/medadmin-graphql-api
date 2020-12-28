const faker = require('./../faker');
const {GENDERS, ID_ROLE_DOCTOR, ROLES, PERCENTAGES} = require('./../constants/User');

exports.seed = async (knex) => {

    await knex('users').del();

    const values = Array(50)
        .fill()
        .map(() => {

            const
                genderId = faker.random.arrayElement([...GENDERS.keys()]),
                dateOfBirth = faker.date.between('1950', '2010').toISOString().split('T').shift(),
                roleId = faker.random.arrayElement([...ROLES.keys()]),
                passport = faker.random.boolean()
                    ? {
                        series: faker.helpers.replaceSymbols('####'),
                        number: faker.helpers.replaceSymbols('######'),
                        dateOfIssue: faker.date.between(dateOfBirth, '2015').toISOString().split('T').shift(),
                        issuedBy: faker.lorem.sentence,
                    } : null,
                registrationAddress = faker.random.boolean()
                    ? {
                        region: faker.address.state(),
                        direction: faker.address.county(),
                        city: faker.address.city(),
                        street: faker.address.streetName(),
                        building: `${faker.random.number({min: 1, max: 500})} корпус ${faker.random.number({min: 1, max: 100})}`,
                        apartment: faker.random.boolean() ? faker.random.number({min: 1, max: 1000}) : null,
                        livesHere: faker.random.boolean()
                    }
                    : null,
                physicalAddress = registrationAddress === null
                    ? null
                    : faker.random.boolean()
                        ? {
                            region: faker.address.state(),
                            direction: faker.address.county(),
                            city: faker.address.city(),
                            street: faker.address.streetName(),
                            building: `${faker.random.number({min: 1, max: 500})} корпус ${faker.random.number({min: 1, max: 100})}`,
                            apartment: faker.random.boolean() ? faker.random.number({min: 1, max: 1000}) : null
                        }
                        : null;

            return {
                firstName: faker.name.firstName(genderId),
                middleName: faker.name.middleName(genderId),
                lastName: faker.name.lastName(genderId),

                phone: `+${faker.random.number({min: 1, max: 9})}${faker.unique(faker.phone.phoneNumber)}`,
                password: '$2b$04$toP1b1dhS0dtpPicQsWjjeOwzl3pvPAfgHDHMT.FXUDy2fuCd4u86', // password,

                genderId: genderId,
                dateOfBirth: dateOfBirth,
                roleId: roleId,

                percentage: roleId === ID_ROLE_DOCTOR
                    ? faker.random.arrayElement(PERCENTAGES)
                    : null,
                comment: faker.random.boolean()
                    ? faker.lorem.sentence()
                    : null,
                passport: JSON.stringify(passport),
                registrationAddress: JSON.stringify(registrationAddress),
                physicalAddress: JSON.stringify(physicalAddress),

                deletedAt: faker.random.boolean()
                    ? faker.date.past().toISOString().replace('T', ' ').slice(0, -5)
                    : null,
                createdAt: faker.date.past().toISOString().replace('T', ' ').slice(0, -5),
                updatedAt: faker.date.recent().toISOString().replace('T', ' ').slice(0, -5),
            }
        });

    return knex('users').insert(values);
};
