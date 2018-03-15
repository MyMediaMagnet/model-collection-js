'use strict';

var expect = require('chai').expect
var faker = require('faker')
let Collection = require('../dist/classes/Collection').default

describe('#Collection', function() {
    it('it cannot be called as a function', function() {
        expect(() => Collection()).to.throw(TypeError)
    });

    it('it should grab be able to collect an array after already being created', function() {
        let collection = new Collection()
        let users = getUsersArray(randomNumber())
        collection.collect(users)
        expect(collection.first().first_name).to.equal(users[0].first_name);
    });

    it('it should grab the first item in the array', function() {
        let users = getUsersArray(randomNumber())
        let collection = new Collection(users)

        expect(collection.first().id).to.equal(users[0].id)
    });

    it('it should grab the last item in the array', function() {
        let users = getUsersArray(randomNumber())
        let collection = new Collection(users)

        expect(collection.last().id).to.equal(users[users.length -1].id);
    });

    it('it should be able to grab nth element in an array', function() {
        let users = getUsersArray(randomNumber())
        let collection = new Collection(users)

        for(let i = 0; i < users.length; i++) {
            expect(collection.nth(i).id).to.equal(users[i].id)            
        }
    });

    it('it should be able to add an item to the array', function() {
        let users = getUsersArray(randomNumber())
        let collection = new Collection(users)
        collection.add(getUserObject(200))

        expect(collection.last().id).to.equal(200);
    });

    it('nth should work after adding an item to the array', function() {
        let users = getUsersArray(randomNumber(5))
        let collection = new Collection(users)
        collection.add(getUserObject(200))

        expect(collection.last().id).to.equal(200)
        expect(collection.nth(1).id).to.equal(users[1].id)
        expect(collection.nth(4).id).to.equal(users[4].id)
    });

    it('it should be able to remove an item from the collection', function() {
        let number = randomNumber()
        let users = getUsersArray(number)
        let collection = new Collection(users)

        expect(collection.count()).to.equal(number)

        collection.remove(collection.first())

        expect(collection.count()).to.equal(number - 1)

        collection.remove(getUserObject(number + 1))

        expect(collection.count()).to.equal(number - 1)
    });

    it('first should work after adding an item to the array', function() {
        let number = randomNumber()
        let users = getUsersArray(number)
        let collection = new Collection(users)
        collection.add(getUserObject(number + 1))

        expect(collection.first().id).to.equal(1)
    });

    it('it should be able to find an item based on a value and optional column', function() {
        let users = getUsersArray(randomNumber(2))
        let collection = new Collection(users)

        expect(collection.find(1).first_name).to.equal(users[0].first_name)
        expect(collection.find(2).first_name).to.equal(users[1].first_name)
        expect(collection.find(30)).to.equal(null)

        // Expect to be able to find by another column
        expect(collection.find(users[0].first_name, 'first_name').id).to.equal(users[0].id)
    });

    it('it should be able to count the items in the collection', function() {
        let number = randomNumber()
        let users = getUsersArray(number)
        let collection = new Collection(users)

        expect(collection.count()).to.equal(number)

        // If we add another item to the collection it should increase by 1
        collection.add(getUserObject())

        expect(collection.count()).to.equal(number + 1)
    });

    it('it should be able loop through the collection with each', function() {
        let users = getUsersArray(randomNumber())
        let collection = new Collection(users)
        let count = 1

        collection.each((item) => {
            expect(item.id).to.equal(count)
            count++
        })

        // Make sure it returns false if not given a callback
        expect(collection.each('some string')).to.equal(false)
    });

    it('it should return a collection of items with get', function() {
        let users = getUsersArray(randomNumber())
        let collection = new Collection(users)

        expect(collection.get()).to.instanceof(Collection);
        expect(collection.get().first().first_name).to.equal(users[0].first_name)
    });

    it('it should be able to save a chain of wheres to the class where property', function() {
        let users = getUsersArray(randomNumber())
        let collection = new Collection(users)

        let new_collection = collection.where('first_name', '=', users[0].first_name).where('last_name', '=', users[0].last_name)

        expect(collection.wheres[0][0]).to.equal('first_name')
        expect(collection.wheres[0][1]).to.equal('=')
        expect(collection.wheres[0][2]).to.equal(users[0].first_name)

        expect(collection.wheres[1][0]).to.equal('last_name')
        expect(collection.wheres[1][1]).to.equal('=')
        expect(collection.wheres[1][2]).to.equal(users[0].last_name)
    });

    it('it should return a collection of items with get after setting where parameters', function() {
        let users = getUsersArray(randomNumber())
        let collection = new Collection(users)

        expect(collection.where('first_name', '=', users[0].first_name).get()).to.instanceof(Collection)
        expect(collection.where('first_name', '=', users[0].first_name).get().first().id).to.equal(users[0].id)
    });

    it('it should be able to determine if a value exists by a key and value or object/array of values', function() {
        let users = getUsersArray(randomNumber())
        let collection = new Collection(users)

        expect(collection.where('first_name', '=', users[0].first_name).exists()).to.equal(true)
        expect(collection.where('first_name', '=', 'Bogus').exists()).to.equal(false)
    });

    it('it should grab the first item based on the given where statements', function() {
        let users = getUsersArray(10)
        let collection = new Collection(users)

        expect(collection.where('first_name', '=', users[8].first_name).first().id).to.equal(users[8].id)
    });

    it('it should provide the correct count based on the given where statements', function() {
        let number = randomNumber(10)
        let users = getUsersArray(number)
        let collection = new Collection(users)

        expect(collection.where('id', '=', users[8].id).count()).to.equal(1)
        
        collection.add(getUserObject(number + 1, users[0]['first_name']))
        
        // expect(collection.where('first_name', '=', users[0].first_name).count()).to.equal(2)
    })

});

// Fake a new user array of user objects
function getUsersArray(count) {
    let users = []
    let id = 1
    while(count > 0) {
        users.push(getUserObject(id))
        count--
        id++
    }

    return users
}

// Fake a new user object
function getUserObject(id = 1, first_name, last_name, email) {
    first_name = first_name ? first_name : faker.name.firstName()
    last_name = last_name ? last_name : faker.name.lastName()
    email = email ? email : faker.internet.email()
    return {
        id: id,
        first_name: first_name,
        last_name: last_name,
        email: email,
        relationship: getRandomObject()
    }
}

// Get a random object
function getRandomObject() {
    return faker.random.objectElement
}

// Get a random number between 1 & 20 or provided min max
function randomNumber(min = 1, max = 20) {
    return faker.random.number({min: min, max: max})
}