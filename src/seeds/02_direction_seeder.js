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

            created_at: faker.date.past(),
            updated_at: faker.date.recent()
        }
    });

    return knex('directions').insert(values);
};
