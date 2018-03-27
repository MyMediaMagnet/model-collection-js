import Collection from '../classes/collection/Collection'
import axios from 'axios'
let pluralize = require('pluralize')
class Query {


    /**
     * A handy way to use your models to interact with an API
     * Example: User.get(1) makes a post request to /api/users/ with the data {id: 1} and will 
     * automatically convert the response into a User model
     */
    constructor() {
        if (new.target === Query) {
            throw new TypeError("Cannot construct Query instances directly");
        }
    }

    /**
     * Make sure any class extending this is able to collect data
     * 
     * @param {*} data 
     */
    collect(data) {
        throw new Error('The collect method has not been properly implemented in the Query child class');
    }

    /**
     * Return the start of the url used to make api requests
     * This method can be overwritten do accomodate different URL patterns
     */
    static baseUrl() {
        return '/'
    }

    /**
     * Return the piece of the url that contain the api indicator
     * This method can be overwritten do accomodate different URL patterns
     */
    static apiRoute() {
        return 'api'
    }

    /**
     * Return the extending class name, lowercase and plural
     */
    route() {
        return pluralize.plural(this.constructor.name).toLowerCase()
    }

    /**
     * Static: Return the extending class name, lowercase and plural
     */
    static route() {
        return pluralize.plural(this.name).toLowerCase()
    }

    /**
     * Get the full base path for all api calls on this model
     */
    static getFullPath() {
        return this.baseUrl() + this.apiRoute() + '/' + this.route() + '/'
    }

    /**
     * Do an index api call
     * 
     * @param {*} params 
     */
    static index(params) {
        return new Promise((resolve, reject) => {
            return axios.get(this.getFullPath(), {params: params}).then(({data}) => {
                resolve(this.collect(data))
            }).catch((e) => {
                reject(e)
            })
        })
    }

    /**
     * Get a particular item from the api
     * Use extended_url to extend the url for more specifc get routes in your api
     * 
     * @param {*} id 
     * @param {*} extended_url 
     */
    static get(id, extended_url = '') {
        return new Promise((resolve, reject) => {
            return axios.post(this.getFullPath() + 'get/' + extended_url, {id: id}).then(({data}) => {
                resolve(new this(data))
            }).catch((e) => {
                reject(e)
            })
        })
    }

    /**
     * Create an item of this model type
     * 
     * @param {*} data 
     */
    static create(data) {
        return new Promise((resolve, reject) => {
            return axios.post(this.getFullPath() + 'create', data).then(({data}) => {
                resolve(new this(data))
            }).catch((e) => {
                reject(e)
            })
        })
    }

    /**
     * Update this item containing the primary key
     * 
     * @param {*} data 
     */
    static update(data) {
        return new Promise((resolve, reject) => {
            return axios.post(this.getFullPath() + 'update', data).then(({data}) => {
                resolve(new this(data))
            }).catch((e) => {
                reject(e)
            })
        })
    }

    /**
     * Delete an item by id
     * 
     * @param {*} id 
     */
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
