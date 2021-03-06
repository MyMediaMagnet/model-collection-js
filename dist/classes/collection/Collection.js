'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Where = require('./Where');

var _Where2 = _interopRequireDefault(_Where);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A useful wrapper for arrays with a variety of helpers
 */
var Collection = function () {

  /**
   * Setup a new collection from an array
   * 
   * @param {*} items 
   */
  function Collection(items) {
    _classCallCheck(this, Collection);

    this.items = [];
    if (items) {
      this.collect(items);
    }
    this.wheres = [];
  }

  /**
   * Set the items in the collection
   * 
   * @param {*} items 
   */


  _createClass(Collection, [{
    key: 'collect',
    value: function collect(items) {
      this.items = items;

      return this;
    }

    /**
     * Find an item in the collection based on the primary key
     * 
     * @param {*} id 
     * @param {*} key 
     */

  }, {
    key: 'find',
    value: function find(id) {
      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';

      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i][key] === id) {
          return this.items[i];
        }
      }

      return null;
    }

    /**
     * Return the first item in the collection
     */

  }, {
    key: 'first',
    value: function first() {
      return this.get().items[0];
    }

    /**
     * Return the last item in the collection
     */

  }, {
    key: 'last',
    value: function last() {
      return this.items[this.items.length - 1];
    }

    /**
     * Grab nth item in the collection
     * 
     * @param {*} nth 
     */

  }, {
    key: 'nth',
    value: function nth(_nth) {
      return this.items[_nth];
    }

    /**
     * Add an item to the collection
     * 
     * @param {*} item 
     */

  }, {
    key: 'add',
    value: function add(item) {
      this.items.push(item);

      return this;
    }

    /**
     * Remove an item from the collection
     * 
     * @param {*} item 
     */

  }, {
    key: 'remove',
    value: function remove(item) {
      var index = this.items.indexOf(item);
      if (index > -1) {
        this.items.splice(index, 1);
      }

      return this;
    }

    /**
     * Start a query on the collection
     * 
     * @param {*} field_name 
     * @param {*} operand 
     * @param {*} value 
     */

  }, {
    key: 'where',
    value: function where(field_name, operand, value) {
      this.wheres.push(new _Where2.default(field_name, operand, value));

      return this;
    }

    /**
     * Based on the given query, do any items exist in the collection
     * @todo fix issue related to this method
     */

  }, {
    key: 'exists',
    value: function exists() {
      for (var i = 0; i < this.items.length; i++) {
        if (this._passesWhereQuery(this.items[i])) {
          this._clearWheres();
          return true;
        }
      }

      this._clearWheres();
      return false;
    }

    /**
     * Return an array of all the items in the collection
     */

  }, {
    key: 'get',
    value: function get() {
      var _this = this;

      var collection = new Collection(this.items.filter(function (item) {
        if (_this._passesWhereQuery(item)) {
          return true;
        }
        return false;
      }));

      this._clearWheres();

      return collection;
    }

    /**
     * Assuming the parameter sent in is a function
     * loop through each item in the collection
     * 
     * @param {*} callback 
     */

  }, {
    key: 'each',
    value: function each(callback) {
      if (typeof callback !== "function") return false;

      this.items.forEach(function (item, key) {
        callback(item, key);
      });

      return true;
    }

    /**
     * Given any wheres, get a count of all the items in the collection
     */

  }, {
    key: 'count',
    value: function count() {
      return this.get().items.length;
    }

    /**
     * Sort the items by integers or strings
     * 
     * @param {*} key 
     * @param {*} direction 
     */

  }, {
    key: 'sort',
    value: function sort(key, direction) {
      this.items = this.items.sort(function (a, b) {
        if (key) {
          a = a[key];
          b = b[key];
        }
        if (typeof a === 'string') {
          a = a.toLowerCase();
        }
        if (typeof b === 'string') {
          b = b.toLowerCase();
        }
        // Use locale compare to compare strings
        if (typeof b === 'string' && typeof a === 'string') {
          if (direction.toLowerCase() === 'asc') {
            return a.localeCompare(b);
          } else {
            return b.localeCompare(a);
          }
        }
        // Comparing integers or floats
        if (direction.toLowerCase() === 'asc') {
          return a > b;
        } else {
          return a < b;
        }
      });

      return this;
    }

    /**
     * Sort the items using the date function
     * 
     * @param {*} key 
     * @param {*} direction 
     */

  }, {
    key: 'sortByDate',
    value: function sortByDate(key, direction) {
      this.items = this.items.sort(function (a, b) {
        if (key) {
          a = a[key];
          b = b[key];
        }
        if (direction.toLowerCase() === 'asc') {
          return new Date(a) - new Date(b);
        } else {
          return new Date(b) - new Date(a);
        }
      });

      return this;
    }

    /**
     * Get the sum of all values, or all values of a given column
     * 
     * @param {*} key 
     */

  }, {
    key: 'sum',
    value: function sum(key) {
      var total = 0;
      this.items.forEach(function (item) {
        var value = item;
        if (key) {
          value = item[key];
        }
        total += parseFloat(value);
      });

      return total;
    }

    /**
     * Get the min of all values, or all values of a given column
     * 
     * @param {*} key 
     */

  }, {
    key: 'min',
    value: function min(key) {
      var min = null;
      this.items.forEach(function (item) {
        var value = item;
        if (key) {
          value = item[key];
        }
        // If min has not been set, this becomes the min so far.  Otherwise compare the current min with this value
        min = min && min < value ? min : value;
      });

      return min;
    }

    /**
     * Get the max of all values, or all values of a given column
     * 
     * @param {*} key 
     */

  }, {
    key: 'max',
    value: function max(key) {
      var max = null;
      this.items.forEach(function (item) {
        var value = item;
        if (key) {
          value = item[key];
        }
        // If max has not been set, this becomes the max so far.  Otherwise compare the current max with this value
        max = max && max > value ? max : value;
      });

      return max;
    }

    /**
     * Get the average of all values, or all values of a given column
     * 
     * @param {*} key 
     */

  }, {
    key: 'average',
    value: function average(key) {
      return this.sum(key) / this.items.length;
    }

    /**
     * If a collection is sent in, merge that collection into this collection
     * If an array is sent in, merge the array into this collection
     * 
     * @param {*} items 
     */

  }, {
    key: 'merge',
    value: function merge(items) {
      var _this2 = this;

      if (items instanceof Collection) {
        items.each(function (item, key) {
          _this2.add(item);
        });
      } else {
        items.forEach(function (item) {
          _this2.add(item);
        });
      }

      return this;
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

  }, {
    key: '_passesWhereQuery',
    value: function _passesWhereQuery(item) {
      for (var i = 0; i < this.wheres.length; i++) {
        if (!this.wheres[i].passes(item)) {
          return false;
        }
      }

      return true;
    }

    /**
     * Private: Clear any existing where statements
     */

  }, {
    key: '_clearWheres',
    value: function _clearWheres() {
      this.wheres = [];
    }
  }]);

  return Collection;
}();

exports.default = Collection;