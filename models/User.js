const path = require('path');
const {ROLES, GENDERS, PERCENTAGES} = require('./../constants/User')

const {Model, ValidationError} = require('objection');

class User extends Model {

    static get tableName() {
        return 'users';
    }

    static get useLimitInFirst() {
        return true;
    }

    static modifiers = {
        withoutTrashed(query) {
            query.whereNull('deletedAt');
        },
        onlyTrashed(query) {
            query.whereNotNull('deletedAt');
        },
    };

    static async beforeInsert({asFindQuery, inputItems}) {

        const [{count}] = await asFindQuery().whereIn('phone', inputItems.map(item => item.phone)).count('id', {as: 'count'});

        if (count) {
            throw new ValidationError({
                data: {
                    phone: 'Такое значение поля phone уже существует'
                }
            })
        }
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'firstName',
                'middleName',
                'lastName',
                'phone',
                'genderId',
                'dateOfBirth',
                'roleId',
            ],

            properties: {
                id: {type: 'integer'},
                firstName: {type: 'string', minLength: 1, maxLength: 50},
                middleName: {type: 'string', minLength: 1, maxLength: 50},
                lastName: {type: 'string', minLength: 1, maxLength: 50},
                phone: {type: 'string', minLength: 16, maxLength: 16},
                password: {type: 'string', minLength: 6, maxLength: 100},
                genderId: {type: 'integer', minimum: 1, maximum: Math.max(...GENDERS.keys())},
                dateOfBirth: {type: 'string', 'format': 'date'},
                roleId: {type: 'integer', minimum: 1, maximum: Math.max(...ROLES.keys())},

                percentage: {type: ['null', 'integer'], minimum: 1, maximum: Math.max(...PERCENTAGES)},
                comment: {type: ['null', 'string'], minLength: 1, maxLength: 255},
                passport: {
                    type: ['null', 'object'],
                    // consider improvements
                    properties: {
                        series: {type: 'string', minLength: 4, maxLength: 4},
                        number: {type: 'integer', minimum: 111111, maximum: 999999},
                        dateOfIssue: {type: 'string', format: 'date'},
                        issuedBy: {type: 'string', minLength: 1, maxLength: 255}
                    }
                },
                registrationAddress: {
                    type: ['null', 'object'],
                    properties: {
                        region: {type: 'string', minLength: 1, maxLength: 255},
                        district: {type: 'string', minLength: 1, maxLength: 255},
                        city: {type: 'string', minLength: 1, maxLength: 50},
                        street: {type: 'string', minLength: 1, maxLength: 100},
                        building: {type: 'string', minLength: 1, maxLength: 100},
                        apartment: {type: ['null', 'integer'], minimum: 1, maximum: 1000},
                        livesHere: {type: 'boolean'},
                    }
                },
                physicalAddress: {
                    type: ['null', 'object'],
                    properties: {
                        region: {type: 'string', minLength: 1, maxLength: 255},
                        district: {type: 'string', minLength: 1, maxLength: 255},
                        city: {type: 'string', minLength: 1, maxLength: 50},
                        street: {type: 'string', minLength: 1, maxLength: 100},
                        building: {type: 'string', minLength: 1, maxLength: 100},
                        apartment: {type: ['null', 'integer'], minimum: 1, maximum: 1000},
                    }
                },
            }
        }
    } // jsonSchema

    static get relationMappings() {

        return {

            services: {
                relation: Model.ManyToManyRelation,
                modelClass: path.join(__dirname, 'Service'),
                join: {
                    from: 'users.id',
                    through: {
                        from: 'serviceUser.userId',
                        to: 'serviceUser.serviceId',
                    },
                    to: 'services.id'
                }
            },

            directions: {
                relation: Model.ManyToManyRelation,
                modelClass: path.join(__dirname, 'Direction'),
                filter: {
                    directionableType: 'User',
                },
                beforeInsert(model) {
                    model.directionableType = 'User'
                },
                join: {
                    from: 'users.id',
                    through: {
                        from: 'directionables.directionableId',
                        to: 'directionables.directionId',
                        extra: ['directionableType'],
                    },
                    to: 'directions.id'
                }
            }
        }

    } // relationMappings
}

module.exports = User;
