'use strict';

var expect = require('chai').expect;
let Collection = require('../dist/classes/Collection').default

describe('#Collection', function() {
    it('it should grab the first item in the array', function() {
        let array = [1, 2, 3, 4]
        let collection = new Collection(array)
        expect(collection.first()).to.equal(1);
    });

    it('it should grab the last item in the array', function() {
        let array = [1, 2, 3, 4]
        let collection = new Collection(array)
        expect(collection.last()).to.equal(4);
    });
});