[![Build Status](https://travis-ci.org/MyMediaMagnet/model-collection-js.svg?branch=master)](https://travis-ci.org/MyMediaMagnet/model-collection-js)
[![Coverage Status](https://coveralls.io/repos/github/MyMediaMagnet/model-collection-js/badge.svg?branch=master)](https://coveralls.io/github/MyMediaMagnet/model-collection-js?branch=master)
[![npm version](https://badge.fury.io/js/model-collection-js.svg)](https://badge.fury.io/js/model-collection-js)

# model-collection-js

Javascript enabled Models and Collections to reflect Laravel workflow


## Installation

  `npm install model-collection-js`

## Usage
(Would appreciate advice on allowing easier imports without folder structure)

### Collection

Some of the most basic usage

    import Collection from 'model-collection-js/dist/classes/collection/Collection'
    let some_array = [1, 2, 3, 4]
    let collection = new Collection(some_array)
    collection.first() // 1
    collection.last() // 4

Using where's

    import Collection from 'model-collection-js/dist/classes/collection/Collection'
    let array = [
        {id: 1, name: 'First'}, 
        {id: 2, name: 'Second'}, 
        {id: 3, name: 'Third'}, 
        {id: 4, name: 'Third'}
    ]
    let collection = new Collection(array)
    collection.where('name', '=', 'First').get() // returns filtered Collection
    collection.where('name', '=', 'First').exists() // returns true/false
    collection.where('name', '=', 'First').first() // returns {id: 1, name: 'First'}
    collection.where('name', '=', 'Third').count() // returns 2

### Model

Setup a basic model by extending the Model class

    import Model from 'model-collection-js/dist/models/Model'
    class User extends Model {
        constructor(data) {
            super(data)
        }
    }

    let user_data = {id: 1, name: 'Some Name'}

    let user = new User(user_data)
    user.name // returns 'Some Name'

You can also collect an array of data and make the entire collection an instance of the given model

    import Model from 'model-collection-js/dist/models/Model'
    class User extends Model {
        constructor(data) {
            super(data)
        }
    }

    let user_data = [{id: 1, name: 'Some Name'}, {id: 1, name: 'Some Other Name'}]
    let users = User.collect(user_data)
    users.first() // returns User model
    users.first().name // returns 'Some Name'
    users.last().name // returns 'Some Other Name'


## Tests

  `npm test` or `npm run cover`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.