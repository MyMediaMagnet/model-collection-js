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

    it('it should create an index url for a model', function() {
        let path = User.getFullPath()

        expect(path).to.equal('/api/users/')
    });
    
});

class User extends Model {
    constructor(data) {
        super(data)
    }
}