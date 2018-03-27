class Relationship{

    /**
     * Setup a new Model instance
     */ 
    constructor(instance, items, caller) {
        this.instance = instance
        this.items = items
        this.caller = caller
        this.collection = null
    }

    /**
     * Collect the items of the relationship and return the first item
     */
    first () {
        return this.getCollection().first()
    }

    /**
     * Collect the items of the relationship and return the last item
     */
    last () {
        return this.getCollection().last()
    }

    /**
     * Collect the items of the relationship and return the nth item
     */
    nth (i) {
        return this.getCollection().nth(i)
    }

    /**
     * Collect the items of the relationship return them as an array
     */
    get () {
        return this.getCollection().items
    }

    /**
     * Add an item to the collection in this relationship
     */
    add (item) {
        return this.getCollection().add(item)
    }

    /**
     * Add an item to the collection in this relationship
     */
    count () {
        return this.getCollection().count()
    }

    /**
     * Send an API request based on the calling model along with data from the parent of this relationship
     */
    create (data, field_name = null, key = 'id') {
        if(!field_name) {
            field_name = this.caller.classNameLower + '_' + key
        }

        data[field_name] = this.caller[key]

        return Promise.resolve(this.instance.constructor.create(data))
    }

    /**
     * Get the currently existing collection, or collect the items for the first time
     */
    collect () {
        return this.getCollection()
    }

    /**
     * Make sure we don't create multiple instances of this collection by 
     * only creating the collection if it doesn't exist on our property
     */
    getCollection() {
        if(!this.collection) {
            this.collection = this.instance.constructor.collect(this.items)
        }

        return this.collection
    }
}

export default Relationship;
