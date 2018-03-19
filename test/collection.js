'use strict';

var expect = require('chai').expect
var faker = require('faker')
let Collection = require('../dist/classes/collection/Collection').default
let Where = require('../dist/classes/collection/Where').default

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

        expect(collection.wheres[0]).to.instanceof(Where)

        expect(collection.wheres[0].field_name).to.equal('first_name')
        expect(collection.wheres[0].operand).to.equal('=')
        expect(collection.wheres[0].value).to.equal(users[0].first_name)

        expect(collection.wheres[1].field_name).to.equal('last_name')
        expect(collection.wheres[1].operand).to.equal('=')
        expect(collection.wheres[1].value).to.equal(users[0].last_name)
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
        
        expect(collection.where('first_name', '=', users[0].first_name).count()).to.equal(2)
    })

    // Create a random amount of users below the age of 20, and a random amount above the age of 20
    // Our count combined with a greater than where query should line up
    it('it should default an operand that is not found to equals', function() {
        let users = []
        let number_under = randomNumber()
        for(let i = number_under; i > 0; i--) {
            users.push(getUserObject(i, null, null, null, 5))
        }

        let number_over = randomNumber()
        for(let i = number_over; i > 0; i--) {
            users.push(getUserObject(i, null, null, null, randomNumber(21, 75)))
        }
        let collection = new Collection(users)

        expect(collection.where('age', '@#', 5).count()).to.equal(number_under)
    })

    // Create a random amount of users below the age of 20, and a random amount above the age of 20
    // Our count combined with a greater than where query should line up
    it('it should be able to find items that dont equal a given value', function() {
        let users = []
        let number_under = randomNumber()
        for(let i = number_under; i > 0; i--) {
            users.push(getUserObject(i, null, null, null, 5))
        }

        let number_over = randomNumber()
        for(let i = number_over; i > 0; i--) {
            users.push(getUserObject(i, null, null, null, randomNumber(21, 75)))
        }
        let collection = new Collection(users)

        expect(collection.where('age', '!=', 5).count()).to.equal(number_over)
    })

    // Create a random amount of users below the age of 20, and a random amount above the age of 20
    // Our count combined with a greater than where query should line up
    it('it should be able to find items greater than a given value', function() {
        let users = []
        let number_under = randomNumber()
        for(let i = number_under; i > 0; i--) {
            users.push(getUserObject(i, null, null, null, randomNumber(5, 20)))
        }

        let number_over = randomNumber()
        for(let i = number_over; i > 0; i--) {
            users.push(getUserObject(i, null, null, null, randomNumber(21, 75)))
        }
        let collection = new Collection(users)

        expect(collection.where('age', '>', 20).count()).to.equal(number_over)
    })

    // Create a random amount of users below the age of 20, and a random amount above the age of 20
    // Our count combined with a greater than where query should line up
    it('it should be able to find items greater than or equal to a given value', function() {
        let users = []
        let number_under = randomNumber()
        for(let i = number_under; i > 0; i--) {
            users.push(getUserObject(i, null, null, null, randomNumber(5, 20)))
        }

        let number_over = randomNumber()
        for(let i = number_over; i > 0; i--) {
            users.push(getUserObject(i, null, null, null, randomNumber(21, 75)))
        }
        let collection = new Collection(users)

        expect(collection.where('age', '>=', 21).count()).to.equal(number_over)
    })

    // Create a random amount of users below the age of 20, and a random amount above the age of 20
    // Our count combined with a less than where query should line up
    it('it should be able to find items less than a given value', function() {
        let users = []
        let number_under = randomNumber()
        for(let i = number_under; i > 0; i--) {
            users.push(getUserObject(i, null, null, null, randomNumber(5, 20)))
        }

        let number_over = randomNumber()
        for(let i = number_over; i > 0; i--) {
            users.push(getUserObject(i, null, null, null, randomNumber(21, 75)))
        }
        let collection = new Collection(users)

        expect(collection.where('age', '<', 21).count()).to.equal(number_under)
    })

    // Create a random amount of users below the age of 20, and a random amount above the age of 20
    // Our count combined with a less than where query should line up
    it('it should be able to find items less than or equal to a given value', function() {
        let users = []
        let number_under = randomNumber()
        for(let i = number_under; i > 0; i--) {
            users.push(getUserObject(i, null, null, null, randomNumber(5, 20)))
        }

        let number_over = randomNumber()
        for(let i = number_over; i > 0; i--) {
            users.push(getUserObject(i, null, null, null, randomNumber(21, 75)))
        }
        let collection = new Collection(users)

        expect(collection.where('age', '<=', 20).count()).to.equal(number_under)
    })

    // Our count combined with a less than where query should line up
    it('it should be able to sort items in the collection', function() {
        let users = getUsersArray()
        let collection = new Collection(users)

        collection = collection.sort('id', 'DESC')

        let last_id = null
        for(let i = 0; i < collection.items.length; i++) {
            if(last_id) {
                expect(collection.items[i].id).to.greaterThan(last_id)
            }
            last_id = collection.items[i].id
        }

        collection = collection.sort('id', 'ASC')

        last_id = null
        for(let i = 0; i < collection.items.length; i++) {
            if(last_id) {
                expect(collection.items[i].id).to.lessThan(last_id)
            }
            last_id = collection.items[i].id
        }
    })

    // Our count combined with a less than where query should line up
    it('it should be able to sort items in the collection by strings', function() {
        let users = getUsersArray()
        let collection = new Collection(users)

        collection = collection.sort('first_name', 'DESC')

        let previous_name = null
        for(let i = 0; i < collection.items.length; i++) {
            if(previous_name) {
                expect(collection.items[i].first_name).to.greaterThan(previous_name)
            }
            previous_name = collection.items[i].first_name
        }

        collection = collection.sort('first_name', 'ASC')

        previous_name = null
        for(let i = 0; i < collection.items.length; i++) {
            if(previous_name) {
                expect(collection.items[i].first_name).to.lessThan(previous_name)
            }
            previous_name = collection.items[i].first_name
        }
    })

    // Our count combined with a less than where query should line up
    it('it shoudnt get fooled by ascii strings', function() {
        let users = [{name: 'Aaron'}, {name: 'ANdy'}, {name: 'BRandon'}, {name: 'BRock'}, {name: 'BRendan'}]
        let collection = new Collection(users)

        collection = collection.sort('name', 'DESC')

        expect(collection.nth(4).name).to.equal('Aaron')
        expect(collection.nth(3).name).to.equal('ANdy')
        expect(collection.nth(2).name).to.equal('BRandon')
        expect(collection.nth(1).name).to.equal('BRendan')
        expect(collection.nth(0).name).to.equal('BRock')
    })

    // Our count combined with a less than where query should line up
    it('it should be able to collect and sort a single level array', function() {
        let users = [5, 1, 2, 4, 3]
        let collection = new Collection(users)

        collection = collection.sort(null, 'DESC')

        expect(collection.nth(0)).to.equal(5)
        expect(collection.nth(1)).to.equal(4)
        expect(collection.nth(2)).to.equal(3)
        expect(collection.nth(3)).to.equal(2)
        expect(collection.nth(4)).to.equal(1)

        
    })

    // Our count combined with a less than where query should line up
    it('it should be able to sort by a date', function() {
        let users = [{date: '1990-02-03'},{date: '1980-07-02'},{date: '1995-01-01'},{date: '02-31-1995'},{date: '1990-02-04'}]
        let collection = new Collection(users)

        collection = collection.sortByDate('date', 'ASC')

        expect(collection.nth(0).date).to.equal('1980-07-02')
        expect(collection.nth(1).date).to.equal('1990-02-03')
        expect(collection.nth(2).date).to.equal('1990-02-04')
        expect(collection.nth(3).date).to.equal('1995-01-01')
        expect(collection.nth(4).date).to.equal('02-31-1995')        

        collection = collection.sortByDate('date', 'DESC')

        expect(collection.nth(4).date).to.equal('1980-07-02')
        expect(collection.nth(3).date).to.equal('1990-02-03')
        expect(collection.nth(2).date).to.equal('1990-02-04')
        expect(collection.nth(1).date).to.equal('1995-01-01')
        expect(collection.nth(0).date).to.equal('02-31-1995')        
    })

});

// Fake a new user array of user objects
function getUsersArray(count, first_name, last_name, email, age) {
    let users = []
    let id = 1
    first_name = first_name ? first_name : faker.name.firstName()
    last_name = last_name ? last_name : faker.name.lastName()
    email = email ? email : faker.internet.email()
    age = age ? age : randomNumber(10, 75)
    while(count > 0) {
        users.push(getUserObject(id))
        count--
        id++
    }

    return users
}

// Fake a new user object
function getUserObject(id = 1, first_name, last_name, email, age) {
    first_name = first_name ? first_name : faker.name.firstName()
    last_name = last_name ? last_name : faker.name.lastName()
    email = email ? email : faker.internet.email()
    age = age ? age : randomNumber(10, 75)
    return {
        id: id,
        first_name: first_name,
        last_name: last_name,
        email: email,
        age: age,
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