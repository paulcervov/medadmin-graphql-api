const faker = require('../faker');

exports.seed = async (knex) => {

    await knex('directions').del();

    const directions = [
        "Акушерство и гинекология",
        "Терапия",
        "Неврология",
        "Эндокринология",
        "Дерматовенерология",
        "Хирургия",
        "Урология и андрология",
        "Маммология",
        "Проктология",
        "Иммунология",
        "Оториноларингология",
        "Офтальмология",
        "Ультразвуковая диагностика",
        "Мануальная терапия",
        "Рефлексотерапия",
        "Стоматология",
        "Компьютерная томография",
        "Гастроэнтерология",
        "Денситометрия",
        "Косметология",
        "Трихология",
        "Психология",
        "Гистероскопия и гистерорезектоскопия",
        "Логопедия"
    ];

    const values = directions.map((direction) => {

        return {
            name: direction,

            createdAt: faker.date.past().toISOString().replace('T', ' ').slice(0, -5),
            updatedAt: faker.date.recent().toISOString().replace('T', ' ').slice(0, -5),
        }
    });

    return knex('directions').insert(values);
};
