'use strict';

var expect = require('chai').expect
var faker = require('faker')
let Where = require('../dist/classes/collection/Where').default
let axios = require('axios')
let moxios = require('moxios')
let sinon = require('sinon')
let Collection = require('../dist/classes/collection/Collection').default
let Model = require('../dist/models/Model').default
let Query = require('../dist/models/Query').default

describe('#Query', function() {

    it('it cannot be called as a function', function() {
        expect(() => Query()).to.throw(TypeError)
    });
    
});

class User extends Model {
    constructor(data) {
        super(data)
    }
}