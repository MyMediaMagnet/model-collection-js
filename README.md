[![Build Status](https://travis-ci.org/MyMediaMagnet/model-collection-js.svg?branch=master)](https://travis-ci.org/MyMediaMagnet/model-collection-js)

[![Coverage Status](https://coveralls.io/repos/github/MyMediaMagnet/model-collection-js/badge.svg?branch=master)](https://coveralls.io/github/MyMediaMagnet/model-collection-js?branch=master)

# model-collection-js

Javascript enabled Models and Collections to reflect Laravel workflow


## Installation

  `npm install model-collection-js`

## Usage
(Would appreciate advice on allowing easier imports without folder structure)

    import Collection from 'model-collection-js/dist/classes/Collection'
    let some_array = [1, 2, 3, 4]
    let collection = new Collection(some_array)
    collection.first() // 1
    collection.last() // 4

    let array = [{id: 1, name: 'First'}, {id: 2, name: 'Second'}, {id: 3, name: 'Third'}]
    let collection = new Collection(array)
    collection.where('name', '=', 'First').get() // returns Collection
    collection.where('name', '=', 'First').exists() // returns true/false
    collection.where('name', '=', 'First').first() // returns 'First'


## Tests

  `npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.