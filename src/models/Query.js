import Collection from '../classes/collection/Collection'
import axios from 'axios'
let pluralize = require('pluralize')
class Query {


    // @todo still thinking about how this class whould work
    // Ideally it will be a nice way to interact with an api
    // For example User.get(1) should maybe get a particular user from the api
    // Any api routes would need to both have structure (CRUD) and also allow for flexible starting route names (not only 'api')
    constructor() {
        if (new.target === Query) {
            throw new TypeError("Cannot construct Query instances directly");
        }
    }

    // Make sure any class extending this is able to collect data
    collect(data) {
        throw new Error('The collect method has not been properly implemented in the Query child class');
    }

    static baseUrl() {
        return '/'
    }

    static apiRoute() {
        return 'api'
    }

    static route() {
        return pluralize.plural(this.name).toLowerCase()
    }

    // Get the full base path for all api calls on this model
    static getFullPath() {
        return this.baseUrl() + this.apiRoute() + '/' + this.route() + '/'
    }

    // Do an index api call
    static index(params) {
        return new Promise((resolve, reject) => {
            return axios.get(this.getFullPath(), {params: params}).then(({data}) => {
                resolve(this.collect(data))
            }).catch((e) => {
                reject(e)
            })
        })
    }

    // Get a particular item from the api
    // Use extended_url to extend the url for more specifc get routes in your api
    static get(id, extended_url = '') {
        return new Promise((resolve, reject) => {
            return axios.post(this.getFullPath() + 'get/' + extended_url, {id: id}).then(({data}) => {
                resolve(new this(data))
            }).catch((e) => {
                reject(e)
            })
        })
    }

    // Create an item of this model type
    static create(data) {
        return new Promise((resolve, reject) => {
            return axios.post(this.getFullPath() + 'create', data).then(({data}) => {
                resolve(new this(data))
            }).catch((e) => {
                reject(e)
            })
        })
    }

    // Update this item containing the primary key
    static update(data) {
        return new Promise((resolve, reject) => {
            return axios.post(this.getFullPath() + 'update', data).then(({data}) => {
                resolve(new this(data))
            }).catch((e) => {
                reject(e)
            })
        })
    }

    // Delete an item by id
    static delete(id) {
        return new Promise((resolve, reject) => {
            return axios.post(this.getFullPath() + 'delete', {id: id}).then(({data}) => {
                resolve(data)
            }).catch((e) => {
                reject(e)
            })
        })
    }
}

export default Query;
