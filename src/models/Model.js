import Collection from '../classes/collection/Collection'
import Query from './Query'
import Relationship from './Relationship'
let pluralize = require('pluralize')
class Model extends Query{

    /**
     * Setup a new Model instance
     * If any data is sent in, set it as properties
     * 
     * @param {*} data 
     */
    constructor(data) {
        if (new.target === Model) {
            throw new TypeError("Cannot construct Model instances directly");
        }

        super()

        // Save any relationships so we don't always create a new relationship class when called
        this.relations = []

        if(data) {
            this.set(data)
        }
    }
    
    /**
     * Set all the data from an array or object as properties of this Model
     * 
     * @param {*} data 
     */
    set(data) {
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if(typeof this[key] == "function") {
                    // Setup the data for method access
                    this['_' + key] = data[key]
                } else {
                    // Add the data as a property
                    this[key] = data[key];
                }
            }
        }

        return this
    }

    /**
     * Create a collection consisting of this model
     * 
     * @param {*} items 
     */
    static collect(items) {
        if(items instanceof Array || items instanceof Object) {
            let collection = new Collection()
            for (var key in items) {
                collection.add(new this(items[key]))
            }
    
            return collection
        }
        
        return new Collection()
    }

    /**
     ********************************************
     * Relationship Methods
     ********************************************
     */

    /**
     * Use the relationship class to extend other model classes and give shorthand functionality
     * 
     * @param {*} instance 
     * @returns Model
     */
    hasOne(instance) {
        let data = this['_' + instance.constructor.name.toLowerCase()]

        return instance.set(data)
    }

    /**
     * Return a relationship that contains information about it's caller and the caller's parent
     * Example: user.posts().create({...}) we want to be able to send in who the user is so we are aware of it when creating the post
     * 
     * @param {*} instance 
     * @returns Relationship
     */
    hasMany(instance) {
        let key = '_' + instance.route()
        let items = this[key]

        if(!this.relations[key]) {
            this.relations[key] = new Relationship(instance, items, this)
        }

        return this.relations[key]
    }

    /**
     ********************************************
     * Getters
     ********************************************
     */
    
    /**
     * Return the original class name in a singler, lowercase format
     */
    get classNameLower() {
        return this.constructor.name.toLowerCase()
    }
    
    /**
     * Return the original class name in a plural, lowercase format
     */
    get classNamePlural() {
        return pluralize.plural(this.constructor.name).toLowerCase()
    }

}

export default Model;
