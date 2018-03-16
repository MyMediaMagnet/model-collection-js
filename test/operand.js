'use strict';

var expect = require('chai').expect
var faker = require('faker')
let Operand = require('../dist/classes/collection//operands/Operand').default
let Equals = require('../dist/classes/collection//operands/Equals').default
let DoesNotEqual = require('../dist/classes/collection//operands/DoesNotEqual').default
let GreaterThan = require('../dist/classes/collection//operands/GreaterThan').default
let GreaterThanOrEqual = require('../dist/classes/collection//operands/GreaterThanOrEqual').default
let LessThan = require('../dist/classes/collection//operands/LessThan').default
let LessThanOrEqual = require('../dist/classes/collection//operands/LessThanOrEqual').default

describe('#Operand', function() {

    it('it cannot be called as a function', function() {
        expect(() => new Operand()).to.throw(TypeError)
    });

    it('it cannot be called as a function', function() {
        expect(() => Operand()).to.throw(TypeError)
    });

    it('it cannot be extended without a check method', function() {
        class SomeClass extends Operand{

        }
        var someClass = new SomeClass()
        expect(() => someClass.check()).to.throw(Error)
    });

    it('does not equal cannot be called as a function', function() {
        expect(() => Equals()).to.throw(TypeError)
    });

    it('equals cannot be called as a function', function() {
        expect(() => DoesNotEqual()).to.throw(TypeError)
    });

    it('greater than cannot be called as a function', function() {
        expect(() => GreaterThan()).to.throw(TypeError)
    });

    it('greater than or equals cannot be called as a function', function() {
        expect(() => GreaterThanOrEqual()).to.throw(TypeError)
    });

    it('less than cannot be called as a function', function() {
        expect(() => LessThan()).to.throw(TypeError)
    });

    it('less than or equals cannot be called as a function', function() {
        expect(() => LessThanOrEqual()).to.throw(TypeError)
    });

    it('operand cannot be extended without a super', function() {
        class NewClass extends Operand {
            constructor() {

            }
        }
        expect(() => new NewClass()).to.throw(ReferenceError)
    });

    it('equals cannot be extended without a super', function() {
        class NewClass extends Equals {
            constructor() {

            }
        }
        expect(() => new NewClass()).to.throw(ReferenceError)
    });

    it('does not equal cannot be extended without a super', function() {
        class NewClass extends DoesNotEqual {
            constructor() {

            }
        }
        expect(() => new NewClass()).to.throw(ReferenceError)
    });

    it('greater than cannot be extended without a super', function() {
        class NewClass extends GreaterThan {
            constructor() {

            }
        }
        expect(() => new NewClass()).to.throw(ReferenceError)
    });

    it('greater than or equal cannot be extended without a super', function() {
        class NewClass extends GreaterThanOrEqual {
            constructor() {

            }
        }
        expect(() => new NewClass()).to.throw(ReferenceError)
    });

    it('less than cannot be extended without a super', function() {
        class NewClass extends LessThan {
            constructor() {

            }
        }
        expect(() => new NewClass()).to.throw(ReferenceError)
    });

    it('less than or equal cannot be extended without a super', function() {
        class NewClass extends LessThanOrEqual {
            constructor() {

            }
        }
        expect(() => new NewClass()).to.throw(ReferenceError)
    });

});