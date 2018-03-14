// A useful wrapper for arrays with a variety of helpers

class Collection {
  
    // Setup a new collection from an array
    constructor(items) {
      this.items = []
      if(items) {
        this.items = items
      }
      this.wheres = []
    }

    // Set the items in the collection
    collect(items) {
      this.items = items

      return this
    }
  
    // Find an item in the array based on 'id'
    find(id) {
      this.items.forEach((item) => {
        if (item.id === id) return item;
      })
      
      return null
    }
  
    // Grab the first item in the collection
    first() {
      return this.items[0]
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
      this.wheres.push([field_name, operand, value])
      
      return this
    }
  
    // Based on the given query, do any items exist
    exists (item) {
      this.items.forEach((item) => {
          if (this._passesWhereQuery(item)) return true
      })

      return false
    }
  
    // Return an array of all the items in the collection
    get () {
        let items = []
      
        this.items.forEach((item) => {
            if (this._passesWhereQuery(item)) {
                items.push(item)
            }
        })
        
        return items
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
        let items = []
      
        this.items.forEach((item) => {
            if (this._passesWhereQuery(item)) {
                items.push(item)
            }
        })
        
        return items.length
    }

    // PRIVATE METHODS
    // Private: used to determine if an item should be added to list based on where query
    _passesWhereQuery(item) {
        this.wheres.forEach((where) => {
          if (item[where[0]] !== where[2]) {
            return false
          }
        })

        return true
    }
  
  }
  
  export default Collection;
  