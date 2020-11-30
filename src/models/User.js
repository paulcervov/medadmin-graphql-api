const path = require('path');

const Model = require('./BaseModel');

class User extends Model {

    static get tableName() {
        return 'users';
    }

    static modifiers = {
        withoutTrashed(query) {
            query.whereNull('deletedAt');
        },
        onlyTrashed(query) {
            query.whereNotNull('deletedAt');
        },
    };

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
                firstName: {type: 'string', minLength: 1, maxLength: 255},
                middleName: {type: 'string', minLength: 1, maxLength: 255},
                lastName: {type: 'string', minLength: 1, maxLength: 255},
                phone: {type: 'string', minLength: 1, maxLength: 255},
                password: {type: 'string', minLength: 1, maxLength: 255},
                genderId: {type: 'number', minLength: 0, maxLength: 1},
                dateOfBirth: {type: 'date'},
                roleId: {type: 'number', minLength: 1, maxLength: 5},

                percentage: {type: ['null', 'number'], minLength: 1, maxLength: 100},
                comment: {type: ['null', 'string'], minLength: 1, maxLength: 255},
                passport: {
                    type: ['null', 'object'],
                    // consider improvements
                    properties: {
                        series: {type: 'string', minLength: 4, maxLength: 4},
                        number: {type: 'number', minLength: 111111, maxLength: 999999},
                        dateOfIssue: {type: 'date'},
                        issuedBy: {type: 'string', minLength: 1, maxLength: 255}
                    }
                },
                registrationAddress: {
                    type: ['null', 'object'],
                    properties: {
                        city: {type: 'string'},
                        street: {type: 'string'},
                        house: {type: 'number'},
                        building: {type: 'string'},
                        apartment: {type: 'string'},
                        livesHere: {type: 'boolean'},
                    }
                },
                physicalAddress: {
                    type: ['null', 'object'],
                    properties: {
                        city: {type: 'string'},
                        street: {type: 'string'},
                        house: {type: 'string'},
                        building: {type: 'string'},
                        apartment: {type: 'string'},
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
