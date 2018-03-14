'use strict';

var expect = require('chai').expect;
let Collection = require('../dist/classes/Collection').default

describe('#Collection', function() {
    it('it should grab be able to collect an array after already being created', function() {
        let collection = new Collection()
        let array = [1, 2, 3, 4]
        collection.collect(array)
        expect(collection.first()).to.equal(1);
    });

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

    it('it should be able to remove an item from the collection', function() {
        let array = [{id: 1, name: 'First'}, {id: 2, name: 'Second'}, {id: 3, name: 'Third'}]
        let collection = new Collection(array)
        expect(collection.count()).to.equal(3)
        collection.remove(array[0])
        expect(collection.count()).to.equal(2)
    
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

    it('it should be able to count the items in the collection', function() {
        let array = [{id: 1, name: 'First'}, {id: 2, name: 'Second'}, {id: 3, name: 'Third'}]
        let collection = new Collection(array)
        expect(collection.count()).to.equal(3);
        // If we add another item to the collection it should increase by 1
        collection.add({id: 4, name: 'Fourth'});
        expect(collection.count()).to.equal(4);
    });

    it('it should be able loop through the collection with each', function() {
        let array = [{id: 1, name: 'First'}, {id: 2, name: 'Second'}, {id: 3, name: 'Third'}]
        let collection = new Collection(array)
        let count = 1
        collection.each((item) => {
            expect(item.id).to.equal(count);
            count++
        })
    });

    it('it should return a collection of items with get', function() {
        let array = [{id: 1, name: 'First'}, {id: 2, name: 'Second'}, {id: 3, name: 'Third'}]
        let collection = new Collection(array)
        expect(collection.get()).to.instanceof(Collection);
        expect(collection.get().first().name).to.equal('First');
    });

    it('it should return a collection of items with get after setting where parameters', function() {
        let array = [{id: 1, name: 'First'}, {id: 2, name: 'Second'}, {id: 3, name: 'Third'}]
        let collection = new Collection(array)
        expect(collection.where('name', '=', 'First').get()).to.instanceof(Collection);
        expect(collection.where('name', '=', 'First').get().count()).to.equal(1);
    });

    it('it should be able to determine if a value exists by a key and value or object/array of values', function() {
        let array = [{id: 1, name: 'First'}, {id: 2, name: 'Second'}, {id: 3, name: 'Third'}]
        let collection = new Collection(array)
        expect(collection.where('name', '=', 'First').exists()).to.equal(true);
        expect(collection.where('name', '=', 'Bogus').exists()).to.equal(false);
    });
});