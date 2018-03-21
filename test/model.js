'use strict';

var expect = require('chai').expect;
let Model = require('../dist/models/Model').default
let Query = require('../dist/classes/Query').default

describe('#Model', function() {

    it('it cannot be called as a function', function() {
        expect(() => Model()).to.throw(TypeError)
    });

    it('it cannot be called directly', function() {
        expect(() => new Model()).to.throw(TypeError);
    });

    it('its parent should not be able to be called directly', function() {
        expect(() => new Query()).to.throw(TypeError);
    });

    it('its parent should not be able to be called as a function', function() {
        expect(() => Query()).to.throw(TypeError);
    });

    it('it should collect an array of User objects', function() {
        let array = [{id: 1, name: 'Jack', email: 'jack@jones.ca'}, {id: 1, name: 'Stacy', email: 'stacy@jones.ca'}]
        let users = User.collect(array)
        expect(users.first().email).to.equal('jack@jones.ca');
        expect(users.first()).to.instanceof(User);
    });

    it('it should collect an object of User objects', function() {
        let array = {0: {id: 1, name: 'Jack', email: 'jack@jones.ca'}, 1: {id: 1, name: 'Stacy', email: 'stacy@jones.ca'}}
        let users = User.collect(array)
        expect(users.first().email).to.equal('jack@jones.ca');
        expect(users.first()).to.instanceof(User);
    });

    it('it should be able to create a User from an object or array', function() {
        let object = {id: 1, name: 'Jack', email: 'jack@jones.ca'}
        let user = new User()
        user.set(object)
        expect(user.email).to.equal('jack@jones.ca');
        expect(user).to.instanceof(User);
    });

    it('it creates api routes based on the extending model', function() {
        let object = {id: 1, name: 'Jack', email: 'jack@jones.ca'}
        let user = new User()
        user.set(object)
        expect(user.route).to.equal('users');
        expect(user.getFullPath()).to.equal('/api/users/');
    });
});

class User extends Model {
    constructor(data) {
        super(data)
    }
}