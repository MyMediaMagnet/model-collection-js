'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Collection = require('../classes/collection/Collection');

var _Collection2 = _interopRequireDefault(_Collection);

var _Query2 = require('./Query');

var _Query3 = _interopRequireDefault(_Query2);

var _Relationship = require('./Relationship');

var _Relationship2 = _interopRequireDefault(_Relationship);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var pluralize = require('pluralize');

var Model = function (_Query) {
    _inherits(Model, _Query);

    /**
     * Setup a new Model instance
     * If any data is sent in, set it as properties
     * 
     * @param {*} data 
     */
    function Model(data) {
        _classCallCheck(this, Model);

        if (new.target === Model) {
            throw new TypeError("Cannot construct Model instances directly");
        }

        var _this = _possibleConstructorReturn(this, (Model.__proto__ || Object.getPrototypeOf(Model)).call(this));

        if (data) {
            _this.set(data);
        }
        return _this;
    }

    /**
     * Set all the data from an array or object as properties of this Model
     * 
     * @param {*} data 
     */


    _createClass(Model, [{
        key: 'set',
        value: function set(data) {
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    if (typeof this[key] == "function") {
                        // Setup the data for method access
                        this['_' + key] = data[key];
                    } else {
                        // Add the data as a property
                        this[key] = data[key];
                    }
                }
            }

            return this;
        }

        /**
         * Create a collection consisting of this model
         * 
         * @param {*} items 
         */

    }, {
        key: 'hasOne',


        /**
         ********************************************
         * Relationship Methods
         ********************************************
         */

        /**
         * Use the relationship class to extend other model classes and give shorthand functionality
         * 
         * @param {*} instance 
         * @returns Model
         */
        value: function hasOne(instance) {
            var data = this['_' + instance.constructor.name.toLowerCase()];

            return instance.set(data);
        }

        /**
         * Return a relationship that contains information about it's caller and the caller's parent
         * Example: user.posts().create({...}) we want to be able to send in who the user is so we are aware of it when creating the post
         * 
         * @param {*} instance 
         * @returns Relationship
         */

    }, {
        key: 'hasMany',
        value: function hasMany(instance) {
            var items = this['_' + instance.route()];

            return new _Relationship2.default(instance, items, this);
        }

        /**
         ********************************************
         * Getters
         ********************************************
         */

        /**
         * Return the original class name in a singler, lowercase format
         */

    }, {
        key: 'classNameLower',
        get: function get() {
            return this.constructor.name.toLowerCase();
        }

        /**
         * Return the original class name in a plural, lowercase format
         */

    }, {
        key: 'classNamePlural',
        get: function get() {
            return pluralize.plural(this.constructor.name).toLowerCase();
        }
    }], [{
        key: 'collect',
        value: function collect(items) {
            if (items instanceof Array || items instanceof Object) {
                var collection = new _Collection2.default();
                for (var key in items) {
                    collection.add(new this(items[key]));
                }

                return collection;
            }

            return new _Collection2.default();
        }
    }]);

    return Model;
}(_Query3.default);

exports.default = Model;