import Where from './Where'

/**
 * A useful wrapper for arrays with a variety of helpers
 */
class Collection {
  
    /**
     * Setup a new collection from an array
     * 
     * @param {*} items 
     */
    constructor(items) {
      this.items = []
      if(items) {
        this.collect(items)
      }
      this.wheres = []
    }

    /**
     * Set the items in the collection
     * 
     * @param {*} items 
     */
    collect(items) {
      this.items = items

      return this
    }
  
    /**
     * Find an item in the collection based on the primary key
     * 
     * @param {*} id 
     * @param {*} key 
     */
    find(id, key = 'id') {
      for(let i = 0; i < this.items.length; i++) {
        if (this.items[i][key] === id) {
          return this.items[i];
        }
      }

      return null
    }
  
    /**
     * Return the first item in the collection
     */
    first() {
      return this.get().items[0]
    }
  
    /**
     * Return the last item in the collection
     */
    last() {
      return this.items[this.items.length - 1]
    }
  
    /**
     * Grab nth item in the collection
     * 
     * @param {*} nth 
     */
    nth(nth) {
      return this.items[nth]
    }
  
    /**
     * Add an item to the collection
     * 
     * @param {*} item 
     */
    add(item) {
      this.items.push(item)
      
      return this
    }
  
    /**
     * Remove an item from the collection
     * 
     * @param {*} item 
     */
    remove(item) {
      let index = this.items.indexOf(item)
      if(index > -1) {
        this.items.splice(index, 1)
      }
      
      return this
    }
  
    /**
     * Start a query on the collection
     * 
     * @param {*} field_name 
     * @param {*} operand 
     * @param {*} value 
     */
    where ( field_name, operand, value ) {
      this.wheres.push(new Where(field_name, operand, value))
      
      return this
    }
  
    /**
     * Based on the given query, do any items exist in the collection
     * @todo fix issue related to this method
     */
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
  
    /**
     * Return an array of all the items in the collection
     */
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
  
    /**
     * Assuming the parameter sent in is a function
     * loop through each item in the collection
     * 
     * @param {*} callback 
     */
    each (callback) {
        if (typeof callback !== "function") return false

        this.items.forEach(function(item, key) {
          callback(item, key);
        })

        return true
    }

    /**
     * Given any wheres, get a count of all the items in the collection
     */
    count() {
        return this.get().items.length
    }

    /**
     * Sort the items by integers or strings
     * 
     * @param {*} key 
     * @param {*} direction 
     */
    sort(key, direction) {
        this.items = this.items.sort((a, b) => {
          if(key) {
            a = a[key]
            b = b[key]
          }
          if(typeof a === 'string') {
            a = a.toLowerCase()
          }
          if(typeof b === 'string') {
            b = b.toLowerCase()
          }
          // Use locale compare to compare strings
          if(typeof b === 'string' && typeof a === 'string') {
            if(direction.toLowerCase() === 'asc'){
              return a.localeCompare(b)
            } else {
              return b.localeCompare(a)
            }
          }
          // Comparing integers or floats
          if(direction.toLowerCase() === 'asc') {
            return a > b
          } else {
            return a < b
          }
        })

        return this
    }

    /**
     * Sort the items using the date function
     * 
     * @param {*} key 
     * @param {*} direction 
     */
    sortByDate(key, direction) {
        this.items = this.items.sort((a, b) => {
          if(key) {
            a = a[key]
            b = b[key]
          }
          if(direction.toLowerCase() === 'asc') {
            return new Date(a) - new Date(b)
          } else {
            return new Date(b) - new Date(a)
          }
        })

        return this
    }

    /**
     * Get the sum of all values, or all values of a given column
     * 
     * @param {*} key 
     */
    sum(key) {
      let total = 0
      this.items.forEach(function(item) {
        let value = item
        if(key) {
          value = item[key]
        }
        total += parseFloat(value)
      })

      return total
    }

    /**
     * Get the min of all values, or all values of a given column
     * 
     * @param {*} key 
     */
    min(key) {
      let min = null
      this.items.forEach(function(item) {
        let value = item
        if(key) {
          value = item[key]
        }
        // If min has not been set, this becomes the min so far.  Otherwise compare the current min with this value
        min = (min && min < value) ? min : value
      })

      return min
    }

    /**
     * Get the max of all values, or all values of a given column
     * 
     * @param {*} key 
     */
    max(key) {
      let max = null
      this.items.forEach(function(item) {
        let value = item
        if(key) {
          value = item[key]
        }
        // If max has not been set, this becomes the max so far.  Otherwise compare the current max with this value
        max = (max && max > value) ? max : value
      })

      return max
    }

    /**
     * Get the average of all values, or all values of a given column
     * 
     * @param {*} key 
     */
    average(key) {
      return this.sum(key) / this.items.length
    }

    /**
     * If a collection is sent in, merge that collection into this collection
     * If an array is sent in, merge the array into this collection
     * 
     * @param {*} items 
     */
    merge(items) {
      if(items instanceof Collection) {
        items.each((item, key) => {
          this.add(item)
        })
      } else {
        items.forEach((item) => {
          this.add(item)
        })
      }

      return this
    }

    /**
     ***********************************
     * PRIVATE METHODS
     ***********************************
     */

    /**
     * Private: used to determine if an item should be added to list based on where query
     * 
     * @param {*} item 
     */
    _passesWhereQuery(item) {
        for(let i = 0; i < this.wheres.length; i++) {
          if (!this.wheres[i].passes(item)) {
            return false
          }
        }

        return true
    }

    /**
     * Private: Clear any existing where statements
     */
    _clearWheres() {
        this.wheres = []
    }
  
  }
  
  export default Collection;
  