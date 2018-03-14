'use strict';

var expect = require('chai').expect;
let Model = require('../dist/models/Model').default

describe('#Model', function() {
    it('it should collect an array of User models', function() {
        let array = [{id: 1, name: 'Jack', email: 'jack@jones.ca'}, {id: 1, name: 'Stacy', email: 'stacy@jones.ca'}]
        let users = User.collect(array)
        expect(users.first().email).to.equal('jack@jones.ca');
        expect(users.first()).to.instanceof(User);
    });
});

class User extends Model {
    constructor(data) {
        super(data)
    }
}