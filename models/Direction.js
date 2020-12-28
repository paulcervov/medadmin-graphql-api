const path = require('path');
const {Model, ValidationError} = require('objection');

class Direction extends Model {

    static get tableName() {
        return 'directions';
    }

    static get useLimitInFirst() {
        return true;
    }

    static async beforeInsert({asFindQuery, inputItems, cancelQuery}) {

        const [{count}] = await asFindQuery().whereIn('name', inputItems.map(item => item.name)).count('id', {as: 'count'});

        if (count) {
            throw new ValidationError({
                data: {
                    name: 'Такое значение поля name уже существует'
                }
            })
        }
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'name',
            ],
            properties: {
                name: {type: 'string', minLength: 1, maxLength: 50},
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
