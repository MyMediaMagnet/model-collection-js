"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Relationship = function () {

    // Setup a new Model instance
    function Relationship(instance, items) {
        _classCallCheck(this, Relationship);

        this.instance = instance;
        this.items = items;
        this.collection = null;
    }

    _createClass(Relationship, [{
        key: "first",
        value: function first() {
            return this.getCollection().first();
        }
    }, {
        key: "last",
        value: function last() {
            return this.getCollection().last();
        }
    }, {
        key: "nth",
        value: function nth(i) {
            return this.getCollection().nth(i);
        }
    }, {
        key: "get",
        value: function get() {
            return this.getCollection().items;
        }
    }, {
        key: "create",
        value: function create(data) {
            // This should dynamically get the id of the extending class...
            // For example: user.posts().create({...}) should automagically send in the user_id with the post content
            return Promise.resolve(this.instance.constructor.create(data));
        }
    }, {
        key: "collect",
        value: function collect() {
            return this.getCollection();
        }
    }, {
        key: "getCollection",
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