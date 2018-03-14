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

    it('it should be able to grab nth element in an array', function() {
        let array = [1, 2, 3, 4]
        let collection = new Collection(array)
        expect(collection.nth(0)).to.equal(1);
        expect(collection.nth(1)).to.equal(2);
        expect(collection.nth(2)).to.equal(3);
        expect(collection.nth(3)).to.equal(4);
    });

    it('it should be able to add an item to the array', function() {
        let array = [1, 2, 3, 4]
        let collection = new Collection(array)
        collection.add(5)
        expect(collection.last()).to.equal(5);
    });

    it('nth should work after adding an item to the array', function() {
        let array = [1, 2, 3, 4]
        let collection = new Collection(array)
        collection.add(5)
        expect(collection.last()).to.equal(5);
        expect(collection.nth(1)).to.equal(2)
        expect(collection.nth(4)).to.equal(5)
    });

    it('first should work after adding an item to the array', function() {
        let array = [1, 2, 3, 4]
        let collection = new Collection(array)
        collection.add(5)
        expect(collection.first()).to.equal(1);
    });

    it('it should be able to find an item based on a value and optional column', function() {
        let array = [{id: 1, name: 'First'}, {id: 2, name: 'Second'}]
        let collection = new Collection(array)
        expect(collection.find(1).name).to.equal('First');
        expect(collection.find(2).name).to.equal('Second');
        // Expect to be able to find by another column
        expect(collection.find('First', 'name').id).to.equal(1);
    });
});