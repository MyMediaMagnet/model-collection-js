import Collection from '../classes/Collection'
import axios from 'axios'
class Query {
    // @todo still thinking about how this class whould work
    // Ideally it will be a nice way to interact with a users api
    // For example User.get() should maybe get a particular user from the api
    // Any api routes would need to both have structure (CRUD) and also allow for flexible starting route names (not only 'api')
    constructor() {
        if (new.target === Query) {
            throw new TypeError("Cannot construct Query instances directly");
        }
        this.items = new Collection()
        this.wheres = []
    }

    // static all(callback) {
    //     return axios.get('/api/' + this.table_name).then(({data}) => {
    //         callback(new Collection(data))
    //     });
    // }
}

export default Query;
