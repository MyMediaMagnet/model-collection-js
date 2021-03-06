'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Operand2 = require('./Operand');

var _Operand3 = _interopRequireDefault(_Operand2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LessThan = function (_Operand) {
    _inherits(LessThan, _Operand);

    function LessThan() {
        _classCallCheck(this, LessThan);

        return _possibleConstructorReturn(this, (LessThan.__proto__ || Object.getPrototypeOf(LessThan)).apply(this, arguments));
    }

    _createClass(LessThan, [{
        key: 'check',


        /**
         * Confirm the actual value is less than the expected value
         * 
         * @param {*} actual 
         * @param {*} expected 
         */
        value: function check(actual, expected) {
            return actual < expected;
        }
    }]);

    return LessThan;
}(_Operand3.default);

exports.default = LessThan;