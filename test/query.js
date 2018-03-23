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

    it('it should make a request to an index url for a model', function() {
        
        User.index().catch(e => {
            expect(e.config.url).to.equal('/api/users/')
        })
        
    });

    it('it should make a request to a get url for a model', function() {
        
        User.get(1).catch(e => {
            expect(e.config.url).to.equal('/api/users/get/')
        })
        
        User.get(1, 'about').catch(e => {
            expect(e.config.url).to.equal('/api/users/get/about')
        })
        
    });

    it('it should make a request to a create url for a model', function() {
        
        User.create({something: 'phony'}).catch(e => {
            expect(e.config.url).to.equal('/api/users/create')
        })
        
    });

    it('it should make a request to an update url for a model', function() {
        
        User.update({something: 'phony'}).catch(e => {
            expect(e.config.url).to.equal('/api/users/update')
        })
        
    });

    it('it should make a request to a delete url for a model', function() {
        
        User.delete(1).catch(e => {
            expect(e.config.url).to.equal('/api/users/delete')
        })
        
    });
    
});

class User extends Model {
    constructor(data) {
        super(data)
    }
}