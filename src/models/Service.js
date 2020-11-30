const path = require('path');
const Model = require('./BaseModel');

class Service extends Model {

    static get tableName() {
        return 'services';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'name',
            ],
            properties: {
                name: { type: 'string', minLength: 1, maxLength: 255 },
            }
        }
    } // jsonSchema

    static get relationMappings() {
        return {
            users: {
                relation: Model.ManyToManyRelation,
                modelClass: path.join(__dirname, 'User'),
                join: {
                    from: 'services.id',
                    through: {
                        from: 'serviceUser.serviceId',
                        to: 'serviceUser.userId',
                    },
                    to: 'users.id'
                }
            }
        }

    } // relationMappings

}

module.exports = Service;
