"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Operand = function () {
    // Any api routes would need to both have structure (CRUD) and also allow for flexible starting route names (not only 'api')
    function Operand() {
        _classCallCheck(this, Operand);

        if (new.target === Operand) {
            throw new TypeError("Cannot construct Operand instances directly");
        }
    }

    _createClass(Operand, [{
        key: "check",
        value: function check(actual, expected) {
            throw new Error('The check method has not been properly implemented in the Operand child class');
        }
    }]);

    return Operand;
}();

exports.default = Operand;