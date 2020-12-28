const ID_GENDER_MALE = 1;
const ID_GENDER_FEMALE = 2;

const GENDERS = new Map([
    [ID_GENDER_MALE, 'Муж.'],
    [ID_GENDER_FEMALE, 'Жен.'],
]);

const ID_ROLE_ADMINISTRATOR = 1;
const ID_ROLE_MANAGER = 2;
const ID_ROLE_DOCTOR = 3;
const ID_ROLE_NURSE = 4;
const ID_ROLE_PATIENT = 5;

const ROLES = new Map([
    [ID_ROLE_ADMINISTRATOR, 'Администратор'],
    [ID_ROLE_MANAGER, 'Менеджер'],
    [ID_ROLE_DOCTOR, 'Врач'],
    [ID_ROLE_NURSE, 'Медсестра'],
    [ID_ROLE_PATIENT, 'Пациент'],
]);

const PERCENTAGES = [5, 10, 15, 20, 25];

module.exports = {
    ID_GENDER_MALE,
    ID_GENDER_FEMALE,
    GENDERS,
    ID_ROLE_ADMINISTRATOR,
    ID_ROLE_MANAGER,
    ID_ROLE_DOCTOR,
    ID_ROLE_NURSE,
    ID_ROLE_PATIENT,
    ROLES,
    PERCENTAGES
}
