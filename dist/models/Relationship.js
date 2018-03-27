'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Relationship = function () {

    /**
     * Setup a new Model instance
     */
    function Relationship(instance, items, caller) {
        _classCallCheck(this, Relationship);

        this.instance = instance;
        this.items = items;
        this.caller = caller;
        this.collection = null;
    }

    /**
     * Collect the items of the relationship and return the first item
     */


    _createClass(Relationship, [{
        key: 'first',
        value: function first() {
            return this.getCollection().first();
        }

        /**
         * Collect the items of the relationship and return the last item
         */

    }, {
        key: 'last',
        value: function last() {
            return this.getCollection().last();
        }

        /**
         * Collect the items of the relationship and return the nth item
         */

    }, {
        key: 'nth',
        value: function nth(i) {
            return this.getCollection().nth(i);
        }

        /**
         * Collect the items of the relationship return them as an array
         */

    }, {
        key: 'get',
        value: function get() {
            return this.getCollection().items;
        }

        /**
         * Add an item to the collection in this relationship
         */

    }, {
        key: 'add',
        value: function add(item) {
            return this.getCollection().add(item);
        }

        /**
         * Add an item to the collection in this relationship
         */

    }, {
        key: 'count',
        value: function count() {
            return this.getCollection().count();
        }

        /**
         * Send an API request based on the calling model along with data from the parent of this relationship
         */

    }, {
        key: 'create',
        value: function create(data) {
            var field_name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'id';

            if (!field_name) {
                field_name = this.caller.classNameLower + '_' + key;
            }

            data[field_name] = this.caller[key];

            return Promise.resolve(this.instance.constructor.create(data));
        }

        /**
         * Get the currently existing collection, or collect the items for the first time
         */

    }, {
        key: 'collect',
        value: function collect() {
            return this.getCollection();
        }

        /**
         * Make sure we don't create multiple instances of this collection by 
         * only creating the collection if it doesn't exist on our property
         */

    }, {
        key: 'getCollection',
        value: function getCollection() {
            if (!this.collection) {
                this.collection = this.instance.constructor.collect(this.items);
            }

            return this.collection;
        }
    }]);

    return Relationship;
}();

exports.default = Relationship;