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
                'first_name',
                'middle_name',
                'last_name',
                'email',
                'password',
                'phone',
                'gender_id',
                'date_of_birth',
                'comment',
                'passport',
                'registration_address',
                'physical_address',
                'role_id',
                'percentage',
            ],

            properties: {
                id: {type: 'integer'},
                first_name: {type: 'string', minLength: 1, maxLength: 255},
                middle_name: {type: 'string', minLength: 1, maxLength: 255},
                last_name: {type: 'string', minLength: 1, maxLength: 255},
                email: {type: 'string', minLength: 1, maxLength: 255},
                password: {type: 'string', minLength: 1, maxLength: 255},

                registration_address: {
                    type: 'object',
                    properties: {
                        city: {type: 'string'},
                        street: {type: 'string'},
                        house: {type: 'string'},
                        building: {type: 'string'},
                        apartment: {type: 'string'},
                        lives_here: {type: 'boolean'},
                    }
                },

                physical_address: {
                    type: 'object',
                    properties: {
                        city: {type: 'string'},
                        street: {type: 'string'},
                        house: {type: 'string'},
                        building: {type: 'string'},
                        apartment: {type: 'string'},
                    }
                },

                role_id: {type: 'number', minLength: 1, maxLength: 5},
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
                        from: 'service_user.user_id',
                        to: 'service_user.service_id',
                    },
                    to: 'services.id'
                }
            },

            directions: {
                relation: Model.ManyToManyRelation,
                modelClass: path.join(__dirname, 'Direction'),
                filter: {
                    directionable_type: 'User',
                },
                beforeInsert(model) {
                    model.directionable_type = 'User'
                },
                join: {
                    from: 'users.id',
                    through: {
                        from: 'directionables.directionable_id',
                        to: 'directionables.direction_id',
                        extra: ['directionable_type'],
                    },
                    to: 'directions.id'
                }
            }
        }

    } // relationMappings
}

module.exports = User
