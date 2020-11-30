const path = require('path');
const Model = require('./BaseModel');

class Direction extends Model {

    static get tableName() {
        return 'directions';
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
                filter: {
                    directionableType: 'User',
                },
                beforeInsert(model) {
                    model.directionableType = 'User'
                },
                join: {
                    from: 'directions.id',
                    through: {
                        from: 'directionables.directionId',
                        to: 'directionables.directionableId',
                        extra: ['directionableType'],
                    },
                    to: 'users.id'
                }
            }
        }

    } // relationMappings

}

module.exports = Direction;
