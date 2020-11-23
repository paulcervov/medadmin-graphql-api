const path = require('path');
const {Model} = require('objection');

class User extends Model {

    static get tableName() {
        return 'users';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'firstName',
                'middleName',
                'lastName',
                'email',
                'password',
                'phone',
                'genderId',
                'dateOfBirth',
                'comment',
                'passport',
                'registrationAddress',
                'physicalAddress',
                'roleId',
                'percentage',
            ],

            properties: {
                id: {type: 'integer'},
                firstName: {type: 'string', minLength: 1, maxLength: 255},
                middleName: {type: 'string', minLength: 1, maxLength: 255},
                lastName: {type: 'string', minLength: 1, maxLength: 255},
                email: {type: 'string', minLength: 1, maxLength: 255},
                password: {type: 'string', minLength: 1, maxLength: 255},

                registrationAddress: {
                    type: 'object',
                    properties: {
                        city: {type: 'string'},
                        street: {type: 'string'},
                        house: {type: 'string'},
                        building: {type: 'string'},
                        apartment: {type: 'string'},
                        livesHere: {type: 'boolean'},
                    }
                },

                physicalAddress: {
                    type: 'object',
                    properties: {
                        city: {type: 'string'},
                        street: {type: 'string'},
                        house: {type: 'string'},
                        building: {type: 'string'},
                        apartment: {type: 'string'},
                    }
                },

                roleId: {type: 'number', minLength: 1, maxLength: 5},
                percentage: {type: ['null', 'number'], minLength: 1, maxLength: 100},

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

module.exports = User
