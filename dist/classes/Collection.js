"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// A useful wrapper for arrays with a variety of helpers

var Collection = function () {

  // Setup a new collection from an array
  function Collection(items) {
    _classCallCheck(this, Collection);

    this.items = [];
    if (items) {
      this.items = items;
    }
    this.wheres = [];
  }

  // Set the items in the collection


  _createClass(Collection, [{
    key: "collect",
    value: function collect(items) {
      this.items = items;

      return this;
    }

    // Find an item in the array based on 'id'

  }, {
    key: "find",
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
    key: "first",
    value: function first() {
      return this.items[0];
    }

    // Grab the last item in the collection

  }, {
    key: "last",
    value: function last() {
      return this.items[this.items.length - 1];
    }

    // Grab nth item in the collection

  }, {
    key: "nth",
    value: function nth(_nth) {
      return this.items[_nth];
    }

    // Add an item to the collection

  }, {
    key: "add",
    value: function add(item) {
      this.items.push(item);

      return this;
    }

    // Remove an item from the collection

  }, {
    key: "remove",
    value: function remove(item) {
      var index = this.items.indexOf(item);
      if (index > -1) {
        this.items.splice(index, 1);
      }

      return this;
    }

    // Start a query on the collection

  }, {
    key: "where",
    value: function where(field_name, operand, value) {
      this.wheres.push([field_name, operand, value]);

      return this;
    }

    // Based on the given query, do any items exist

  }, {
    key: "exists",
    value: function exists(item) {
      var _this = this;

      this.items.forEach(function (item) {
        if (_this._passesWhereQuery(item)) return true;
      });

      return false;
    }

    // Return an array of all the items in the collection

  }, {
    key: "get",
    value: function get() {
      var _this2 = this;

      var items = [];

      this.items.forEach(function (item) {
        if (_this2._passesWhereQuery(item)) {
          items.push(item);
        }
      });

      return items;
    }

    // Loop through each item in the collection

  }, {
    key: "each",
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
    key: "count",
    value: function count() {
      var _this3 = this;

      var items = [];

      this.items.forEach(function (item) {
        if (_this3._passesWhereQuery(item)) {
          items.push(item);
        }
      });

      return items.length;
    }

    // PRIVATE METHODS
    // Private: used to determine if an item should be added to list based on where query

  }, {
    key: "_passesWhereQuery",
    value: function _passesWhereQuery(item) {
      this.wheres.forEach(function (where) {
        if (item[where[0]] !== where[2]) {
          return false;
        }
      });

      return true;
    }
  }]);

  return Collection;
}();

exports.default = Collection;