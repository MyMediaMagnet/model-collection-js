'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Equals = require('./operands/Equals');

var _Equals2 = _interopRequireDefault(_Equals);

var _DoesNotEqual = require('./operands/DoesNotEqual');

var _DoesNotEqual2 = _interopRequireDefault(_DoesNotEqual);

var _GreaterThan = require('./operands/GreaterThan');

var _GreaterThan2 = _interopRequireDefault(_GreaterThan);

var _GreaterThanOrEqual = require('./operands/GreaterThanOrEqual');

var _GreaterThanOrEqual2 = _interopRequireDefault(_GreaterThanOrEqual);

var _LessThan = require('./operands/LessThan');

var _LessThan2 = _interopRequireDefault(_LessThan);

var _LessThanOrEqual = require('./operands/LessThanOrEqual');

var _LessThanOrEqual2 = _interopRequireDefault(_LessThanOrEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Where = function () {
    /**
     * Construct a where statement
     * 
     * @param {*} field_name 
     * @param {*} operand 
     * @param {*} value 
     */
    function Where(field_name, operand, value) {
        _classCallCheck(this, Where);

        this.field_name = field_name;
        this.operand = operand;
        this.value = value;

        this.operandClass = this.setupOperand();
    }

    /**
     * Confirm that the given values pass the check based on the given operand
     * 
     * @param {*} item 
     */


    _createClass(Where, [{
        key: 'passes',
        value: function passes(item) {
            return this.operandClass.check(item[this.field_name], this.value);
        }

        /**
         * Set the class to handle the check based on the operand
         */

    }, {
        key: 'setupOperand',
        value: function setupOperand() {
            switch (this.operand) {
                case '=':
                    return new _Equals2.default();
                case '!=':
                    return new _DoesNotEqual2.default();
                case '>':
                    return new _GreaterThan2.default();
                case '>=':
                    return new _GreaterThanOrEqual2.default();
                case '<':
                    return new _LessThan2.default();
                case '<=':
                    return new _LessThanOrEqual2.default();
                default:
                    return new _Equals2.default();
            }
        }
    }]);

    return Where;
}();

exports.default = Where;