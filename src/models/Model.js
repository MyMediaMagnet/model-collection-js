import Collection from '../classes/Collection'
import Query from '../classes/Query'
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
        // Objects need to be iterated a particular way
        if(data instanceof Object){
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    this[key] = data[key];
                }
            }
        } 
        // Arrays we can set as normal
        else {
            data.forEach(function(key, column){
                this[key] = column
            })
        }

        return this
    }

    // Create a collection consisting of this model
    static collect(items) {
        if(items instanceof Array || items instanceof Object) {
            let collection = new Collection()
            items.forEach((item) => {
                collection.add(new this(item))
            })
    
            return collection
        }
        
        return new Collection()
    }

}

export default Model;
