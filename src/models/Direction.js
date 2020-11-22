const path = require('path');
const {Model} = require('objection');

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
                    directionable_type: 'User',
                },
                beforeInsert(model) {
                    model.directionable_type = 'User'
                },
                join: {
                    from: 'directions.id',
                    through: {
                        from: 'directionables.direction_id',
                        to: 'directionables.directionable_id',
                        extra: ['directionable_type'],
                    },
                    to: 'users.id'
                }
            }
        }

    } // relationMappings

}

module.exports = Direction;
