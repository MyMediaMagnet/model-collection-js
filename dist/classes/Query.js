'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Collection = require('../classes/Collection');

var _Collection2 = _interopRequireDefault(_Collection);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Query = function () {
    function Query() {
        _classCallCheck(this, Query);

        if (new.target === Query) {
            throw new TypeError("Cannot construct Query instances directly");
        }
        this.items = new _Collection2.default();
        this.wheres = [];
    }

    _createClass(Query, null, [{
        key: 'all',
        value: function all(callback) {
            return _axios2.default.get('/api/' + this.table_name).then(function (_ref) {
                var data = _ref.data;

                callback(new _Collection2.default(data));
            });
        }
    }]);

    return Query;
}();

exports.default = Query;