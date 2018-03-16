'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Operand2 = require('./Operand');

var _Operand3 = _interopRequireDefault(_Operand2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GreaterThanOrEqual = function (_Operand) {
    _inherits(GreaterThanOrEqual, _Operand);

    function GreaterThanOrEqual() {
        _classCallCheck(this, GreaterThanOrEqual);

        return _possibleConstructorReturn(this, (GreaterThanOrEqual.__proto__ || Object.getPrototypeOf(GreaterThanOrEqual)).apply(this, arguments));
    }

    return GreaterThanOrEqual;
}(_Operand3.default);

exports.default = GreaterThan;