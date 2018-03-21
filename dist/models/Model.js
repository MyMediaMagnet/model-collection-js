'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Collection = require('../classes/collection/Collection');

var _Collection2 = _interopRequireDefault(_Collection);

var _Query2 = require('./Query');

var _Query3 = _interopRequireDefault(_Query2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Model = function (_Query) {
    _inherits(Model, _Query);

    // Setup a new Model instance
    function Model(data) {
        _classCallCheck(this, Model);

        if (new.target === Model) {
            throw new TypeError("Cannot construct Model instances directly");
        }

        // Call the Query constructor

        // If data is sent in, set it as properties
        var _this = _possibleConstructorReturn(this, (Model.__proto__ || Object.getPrototypeOf(Model)).call(this));

        if (data) {
            _this.set(data);
        }
        return _this;
    }

    // Set all the data from an array or object as properties of this Model


    _createClass(Model, [{
        key: 'set',
        value: function set(data) {
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    this[key] = data[key];
                }
            }

            return this;
        }

        // Create a collection consisting of this model

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