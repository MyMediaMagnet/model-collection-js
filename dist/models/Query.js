'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Collection = require('../classes/collection/Collection');

var _Collection2 = _interopRequireDefault(_Collection);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pluralize = require('pluralize');

var Query = function () {

    // @todo still thinking about how this class whould work
    // Ideally it will be a nice way to interact with an api
    // For example User.get(1) should maybe get a particular user from the api
    // Any api routes would need to both have structure (CRUD) and also allow for flexible starting route names (not only 'api')
    function Query() {
        _classCallCheck(this, Query);

        if (new.target === Query) {
            throw new TypeError("Cannot construct Query instances directly");
        }
    }

    // Make sure any class extending this is able to collect data


    _createClass(Query, [{
        key: 'collect',
        value: function collect(data) {
            throw new Error('The collect method has not been properly implemented in the Query child class');
        }
    }], [{
        key: 'baseUrl',
        value: function baseUrl() {
            return '/';
        }
    }, {
        key: 'apiRoute',
        value: function apiRoute() {
            return 'api';
        }
    }, {
        key: 'route',
        value: function route() {
            return pluralize.plural(this.name).toLowerCase();
        }

        // Get the full base path for all api calls on this model

    }, {
        key: 'getFullPath',
        value: function getFullPath() {
            return this.baseUrl() + this.apiRoute() + '/' + this.route() + '/';
        }

        // Do an index api call

    }, {
        key: 'index',
        value: function index(params) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                return _axios2.default.get(_this.getFullPath(), { params: params }).then(function (_ref) {
                    var data = _ref.data;

                    resolve(_this.collect(data));
                }).catch(function (e) {
                    reject(e);
                });
            });
        }

        // Get a particular item from the api
        // Use extended_url to extend the url for more specifc get routes in your api

    }, {
        key: 'get',
        value: function get(id) {
            var _this2 = this;

            var extended_url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

            return new Promise(function (resolve, reject) {
                return _axios2.default.post(_this2.getFullPath() + 'get/' + extended_url, { id: id }).then(function (_ref2) {
                    var data = _ref2.data;

                    resolve(new _this2(data));
                }).catch(function (e) {
                    reject(e);
                });
            });
        }

        // Create an item of this model type

    }, {
        key: 'create',
        value: function create(data) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                return _axios2.default.post(_this3.getFullPath() + 'create', data).then(function (_ref3) {
                    var data = _ref3.data;

                    resolve(new _this3(data));
                }).catch(function (e) {
                    reject(e);
                });
            });
        }

        // Update this item containing the primary key

    }, {
        key: 'update',
        value: function update(data) {
            var _this4 = this;

            return new Promise(function (resolve, reject) {
                return _axios2.default.post(_this4.getFullPath() + 'update', data).then(function (_ref4) {
                    var data = _ref4.data;

                    resolve(new _this4(data));
                }).catch(function (e) {
                    reject(e);
                });
            });
        }

        // Delete an item by id

    }, {
        key: 'delete',
        value: function _delete(id) {
            var _this5 = this;

            return new Promise(function (resolve, reject) {
                return _axios2.default.post(_this5.getFullPath() + 'delete', { id: id }).then(function (_ref5) {
                    var data = _ref5.data;

                    resolve(data);
                }).catch(function (e) {
                    reject(e);
                });
            });
        }
    }]);

    return Query;
}();

exports.default = Query;