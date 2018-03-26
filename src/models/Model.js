import Collection from '../classes/collection/Collection'
import Query from './Query'
import Relationship from './Relationship'
class Model extends Query{

    // Setup a new Model instance
    constructor(data) {
        if (new.target === Model) {
            throw new TypeError("Cannot construct Model instances directly");
        }

        // Call the Query constructor
        super()

        // If data is sent in, set it as properties
        if(data) {
            this.set(data)
        }
    }
    
    // Set all the data from an array or object as properties of this Model
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

    // Create a collection consisting of this model
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

    // Relationship Methods
    // Use the relationship class to extend other model classes and give shorthand functionality

    // Belongs To
    hasOne(instance) {
        let data = this['_' + instance.constructor.name.toLowerCase()]

        return instance.set(data)
    }

    // Has Many
    hasMany(instance) {
        // We want to figure out information dynamically here about the caller of this method
        // For example: user.posts().create({...}) we want to be able to send in who the user is so we are aware of it when creating the post
        let items = this['_' + instance.route()]

        return new Relationship(instance, items)
    }

}

export default Model;
