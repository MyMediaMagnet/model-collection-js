// A useful wrapper for arrays with a variety of helpers
import Where from './Where'

class Collection {
  
    // Setup a new collection from an array
    constructor(items) {
      this.items = []
      if(items) {
        this.collect(items)
      }
      this.wheres = []
    }

    // Set the items in the collection
    collect(items) {
      this.items = items

      return this
    }
  
    // Find an item in the collection based on 'id'
    find(id, key = 'id') {
      for(let i = 0; i < this.items.length; i++) {
        if (this.items[i][key] === id) {
          return this.items[i];
        }
      }

      return null
    }
  
    // Grab the first item in the collection
    first() {
      return this.get().items[0]
    }
  
    // Grab the last item in the collection
    last() {
      return this.items[this.items.length - 1]
    }
  
    // Grab nth item in the collection
    nth(nth) {
      return this.items[nth]
    }
  
    // Add an item to the collection
    add(item) {
      this.items.push(item)
      
      return this
    }
  
    // Remove an item from the collection
    remove(item) {
      let index = this.items.indexOf(item)
      if(index > -1) {
        this.items.splice(index, 1)
      }
      
      return this
    }
  
    // Start a query on the collection
    where ( field_name, operand, value ) {
      this.wheres.push(new Where(field_name, operand, value))
      
      return this
    }
  
    // Based on the given query, do any items exist in the collection
    exists () {
      for(let i = 0; i < this.items.length; i++) {
        if (this._passesWhereQuery(this.items[i])) {
          this._clearWheres()
          return true
        }
      }
      
      this._clearWheres()
      return false
    }
  
    // Return an array of all the items in the collection
    get () {
      let collection = new Collection(this.items.filter((item) => {
        if (this._passesWhereQuery(item)) {
          return true
        }
        return false
      }))

      this._clearWheres()

      return collection
    }
  
    // Loop through each item in the collection
    each (callback) {
        // Make sure the callback is a function​
        if (typeof callback !== "function") return false

        this.items.forEach(function(item) {
          callback(item);
        })

        return true
    }

    // Given any queries, get a count of all the items in the collection
    count() {
        return this.get().items.length
    }

    // Determine if a given key exists in the collection
    sort(key, direction) {
        this.items = this.items.sort((a, b) => {
          if(direction.toLowerCase() === 'asc') {
            return a > b
          } else {
            return a < b
          }
        })

        return this
    }

    // PRIVATE METHODS
    // Private: used to determine if an item should be added to list based on where query
    _passesWhereQuery(item) {
        for(let i = 0; i < this.wheres.length; i++) {
          if (!this.wheres[i].passes(item)) {
            return false
          }
        }

        return true
    }

    // Private: Clear any existing where statements
    _clearWheres() {
        this.wheres = []
    }
  
  }
  
  export default Collection;
  