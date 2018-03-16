'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Collection = require('../classes/collection/Collection');

var _Collection2 = _interopRequireDefault(_Collection);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Query =
// @todo still thinking about how this class whould work
// Ideally it will be a nice way to interact with a users api
// For example User.get() should maybe get a particular user from the api
// Any api routes would need to both have structure (CRUD) and also allow for flexible starting route names (not only 'api')
function Query() {
    _classCallCheck(this, Query);

    if (new.target === Query) {
        throw new TypeError("Cannot construct Query instances directly");
    }
    this.items = new _Collection2.default();
    this.wheres = [];
}

// static all(callback) {
//     return axios.get('/api/' + this.table_name).then(({data}) => {
//         callback(new Collection(data))
//     });
// }
;

exports.default = Query;