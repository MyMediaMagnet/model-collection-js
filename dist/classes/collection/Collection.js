'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // A useful wrapper for arrays with a variety of helpers


var _Where = require('./Where');

var _Where2 = _interopRequireDefault(_Where);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Collection = function () {

  // Setup a new collection from an array
  function Collection(items) {
    _classCallCheck(this, Collection);

    this.items = [];
    if (items) {
      this.collect(items);
    }
    this.wheres = [];
  }

  // Set the items in the collection


  _createClass(Collection, [{
    key: 'collect',
    value: function collect(items) {
      this.items = items;

      return this;
    }

    // Find an item in the collection based on 'id'

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

    // Grab the first item in the collection

  }, {
    key: 'first',
    value: function first() {
      return this.get().items[0];
    }

    // Grab the last item in the collection

  }, {
    key: 'last',
    value: function last() {
      return this.items[this.items.length - 1];
    }

    // Grab nth item in the collection

  }, {
    key: 'nth',
    value: function nth(_nth) {
      return this.items[_nth];
    }

    // Add an item to the collection

  }, {
    key: 'add',
    value: function add(item) {
      this.items.push(item);

      return this;
    }

    // Remove an item from the collection

  }, {
    key: 'remove',
    value: function remove(item) {
      var index = this.items.indexOf(item);
      if (index > -1) {
        this.items.splice(index, 1);
      }

      return this;
    }

    // Start a query on the collection

  }, {
    key: 'where',
    value: function where(field_name, operand, value) {
      this.wheres.push(new _Where2.default(field_name, operand, value));

      return this;
    }

    // Based on the given query, do any items exist in the collection

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

    // Return an array of all the items in the collection

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

    // Loop through each item in the collection

  }, {
    key: 'each',
    value: function each(callback) {
      // Make sure the callback is a function​
      if (typeof callback !== "function") return false;

      this.items.forEach(function (item) {
        callback(item);
      });

      return true;
    }

    // Given any queries, get a count of all the items in the collection

  }, {
    key: 'count',
    value: function count() {
      return this.get().items.length;
    }

    // PRIVATE METHODS
    // Private: used to determine if an item should be added to list based on where query

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

    // Private: Clear any existing where statements

  }, {
    key: '_clearWheres',
    value: function _clearWheres() {
      this.wheres = [];
    }
  }]);

  return Collection;
}();

exports.default = Collection;