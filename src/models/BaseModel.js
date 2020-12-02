const {Model} = require('objection');

class BaseModel extends Model {
    static get useLimitInFirst() {
        return true;
    }
}

module.exports = BaseModel;
