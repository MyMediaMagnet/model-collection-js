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

##### Some of the most basic usage
```es6
import Collection from 'model-collection-js/dist/classes/collection/Collection'
let some_array = [1, 2, 3, 4]
let collection = new Collection(some_array)
collection.first() // 1
collection.last() // 4
collection.nth(1) // 2 (basically just the index of the list)
```
##### Adding and Removing items from the collection
```es6
import Collection from 'model-collection-js/dist/classes/collection/Collection'
let array = [
    {id: 1, name: 'First'}, 
    {id: 2, name: 'Second'}, 
    {id: 3, name: 'Third'}, 
    {id: 4, name: 'Third'}
]
let collection = new Collection(array)
collection.add({id: 5, name: 'Fourth'}) // Returns Collection with new item added
collection.remove({id: 1, name: 'First'}) // Returns Collection item removed
```
##### Using where's
```es6
import Collection from 'model-collection-js/dist/classes/collection/Collection'
let array = [
    {id: 1, name: 'First'}, 
    {id: 2, name: 'Second'}, 
    {id: 3, name: 'Third'}, 
    {id: 4, name: 'Third'}
]
let collection = new Collection(array)
collection.where('name', '=', 'First').get() // Returns filtered Collection
collection.where('name', '=', 'First').exists() // Returns true/false
collection.where('name', '=', 'First').first() // Returns {id: 1, name: 'First'}
collection.where('name', '=', 'Third').count() // Returns 2
collection.where('name', '=', 'Third').where('id', 3).count() // Returns 1
collection.where('name', '=', 'Third').where('id', 1).count() // Returns 0
```
##### Sorting the collection
```es6
import Collection from 'model-collection-js/dist/classes/collection/Collection'
let array = [
    {id: 1, name: 'First'}, 
    {id: 2, name: 'Second'}, 
    {id: 3, name: 'Third'}, 
    {id: 4, name: 'Third'}
]
let collection = new Collection(array)
collection.sort('name', 'DESC') // Returns sorted Collection
collection.sort('name', 'ASC') // Returns sorted Collection
collection.sortByDate('date', 'DESC') // Returns sorted Collection
collection.sortByDate('date', 'ASC') // Returns sorted Collection

let basic_collection = new Collection([1,2,3,4])
basic_collection.sort(null, 'DESC') // Returns sorted Collection
```
##### Other Helpers
```es6
import Collection from 'model-collection-js/dist/classes/collection/Collection'
let array = [
    {id: 1, name: 'First'}, 
    {id: 2, name: 'Second'}, 
    {id: 3, name: 'Third'}, 
    {id: 4, name: 'Third'}
]

let collection = new Collection(array)
collection.each(function(item, key){
    // Perform an action on each item in the collection
})

// The find method is a method most useful when collecting objects with an 'id'
collection.find(3) // Returns {id:3, name: 'Third'}
collection.find(1) // Returns {id:1, name: 'First'}
collection.find('Second', 'name') // Returns {id:2, name: 'Second'} (you can override the primary key if you want)

// Mins maxes and averages
collection.min('id') // Returns 1
collection.max('id') // Returns 4
collection.average('id') // Returns 2.5

let basic_collection = new Collection([1,2,3,4])
basic_collection.min() // Returns 1
basic_collection.max() // Returns 4
basic_collection.average() // Returns 2.5
```
### Model
Setup a basic model by extending the Model class
```es6
import Model from 'model-collection-js/dist/models/Model'
class User extends Model {
    constructor(data) {
        super(data)
    }
}

let user_data = {id: 1, name: 'Some Name'}

let user = new User(user_data)
user.name // Returns 'Some Name'
```
You can also collect an array of data and make the entire collection an instance of the given model
```es6
import Model from 'model-collection-js/dist/models/Model'
class User extends Model {
    constructor(data) {
        super(data)
    }
}

let user_data = [{id: 1, name: 'Some Name'}, {id: 1, name: 'Some Other Name'}]
let users = User.collect(user_data)
users.first() // Returns User model
users.first().name // Returns 'Some Name'
users.last().name // Returns 'Some Other Name'
```

## Tests

`npm test` or `npm run cover`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.