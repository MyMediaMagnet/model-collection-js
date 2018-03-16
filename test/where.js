'use strict';

var expect = require('chai').expect
var faker = require('faker')
let Where = require('../dist/classes/collection/Where').default

describe('#Where', function() {
    it('it cannot be called as a function', function() {
        expect(() => Where()).to.throw(TypeError)
    });
});