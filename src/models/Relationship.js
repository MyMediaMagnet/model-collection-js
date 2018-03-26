class Relationship{

    // Setup a new Model instance
    constructor(instance, items) {
        this.instance = instance
        this.items = items
        this.collection = null
    }

    first () {
        return this.getCollection().first()
    }

    last () {
        return this.getCollection().last()
    }

    nth (i) {
        return this.getCollection().nth(i)
    }

    get () {
        return this.getCollection().items
    }

    create (data) {
        // This should dynamically get the id of the extending class...
        // For example: user.posts().create({...}) should automagically send in the user_id with the post content
        return Promise.resolve(this.instance.constructor.create(data))
    }

    collect () {
        return this.getCollection()
    }

    getCollection() {
        if(!this.collection) {
            this.collection = this.instance.constructor.collect(this.items)
        }

        return this.collection
    }
}

export default Relationship;
