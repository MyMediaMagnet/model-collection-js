import Collection from '../classes/Collection'
import axios from 'axios'
class Query {
    constructor() {
        if (new.target === Query) {
            throw new TypeError("Cannot construct Query instances directly");
        }
        this.items = new Collection()
        this.wheres = []
    }

    static all(callback) {
        return axios.get('/api/' + this.table_name).then(({data}) => {
            callback(new Collection(data))
        });
    }
}

export default Query;
