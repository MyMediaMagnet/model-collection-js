'use strict';

var expect = require('chai').expect;
let Collection = require('../dist/classes/collection/Collection').default
let Model = require('../dist/models/Model').default
let Query = require('../dist/models/Query').default
let Relationship = require('../dist/models/Relationship').default

describe('#Model', function() {

    it('it cannot be called as a function', function() {
        expect(() => Model()).to.throw(TypeError)
    });

    it('it cannot be called directly', function() {
        expect(() => new Model()).to.throw(TypeError);
    });

    it('its parent should not be able to be called directly', function() {
        expect(() => new Query()).to.throw(TypeError);
    });

    it('its parent should not be able to be called as a function', function() {
        expect(() => Query()).to.throw(TypeError);
    });

    it('it should collect an array of User objects', function() {
        let array = [{id: 1, name: 'Jack', email: 'jack@jones.ca'}, {id: 1, name: 'Stacy', email: 'stacy@jones.ca'}]
        let users = User.collect(array)
        expect(users.first().email).to.equal('jack@jones.ca');
        expect(users.first()).to.instanceof(User);
    });

    it('it should collect an object of User objects', function() {
        let array = {0: {id: 1, name: 'Jack', email: 'jack@jones.ca'}, 1: {id: 1, name: 'Stacy', email: 'stacy@jones.ca'}}
        let users = User.collect(array)
        expect(users.first().email).to.equal('jack@jones.ca');
        expect(users.first()).to.instanceof(User);
    });

    it('it should be able to create a User from an object or array', function() {
        let object = {id: 1, name: 'Jack', email: 'jack@jones.ca'}
        let user = new User()
        user.set(object)
        expect(user.email).to.equal('jack@jones.ca');
        expect(user).to.instanceof(User);
    });

    it('it creates api routes based on the extending model', function() {
        let object = {id: 1, name: 'Jack', email: 'jack@jones.ca'}
        let user = new User(object)
        expect(User.route()).to.equal('users')
        expect(User.getFullPath()).to.equal('/api/users/')
    });

    it('it is able to get a hasMany relationship', function() {
        let object = {id: 1, name: 'Jack', email: 'jack@jones.ca', posts: [{id: 1, title: 'Something Great'}, {id: 2, title: 'Something New'}]}
        let user = new User(object)
        expect(user.posts()).to.instanceof(Relationship);
        expect(user.posts().get()).to.instanceof(Array);
        expect(user.posts().first()).to.instanceof(Post);
        expect(user.posts().collect()).to.instanceof(Collection);

        expect(user.posts().first().title).to.equal("Something Great");
        expect(user.posts().collect().last().title).to.equal("Something New");
    });

    it('it is able to create from a hasMany relationship', function() {
        let object = {id: 99, name: 'Jack', email: 'jack@jones.ca', posts: [{id: 1, title: 'Something Great'}, {id: 2, title: 'Something New'}]}
        let user = new User(object)

        user.posts().create({id: 3, title: 'The Newest'}).catch(e => {
            expect(JSON.parse(e.config.data).user_id).to.equal(99)
            expect(e.config.url).to.equal('/api/posts/create')
        })
    });

    it('it is able to get from a belongsTo relationship', function() {
        let object = {id: 1, title: "A Great Post", user: {id: 100, name: "Jack", email: 'test@tester.com'}}
        let post = new Post(object)

        expect(post.user()).to.instanceof(User);
        expect(post.user().name).to.equal('Jack')
    });

    it('it is able to handle a chain of relationships', function() {
        let object = {
            id: 1, 
            title: "A Great Post", 
            user: {id: 100, name: "Jack", email: 'test@tester.com'},
            comments: [
                {id:1000, body: 'some comment', user:{id: 100, name: 'Jack', email: 'test@tester.com'}},
                {id:1001, body: 'some other comment', user:{id: 101, name: 'Jones', email: 'jones@tester.com'}},
            ]
        }
        let post = new Post(object)

        expect(post.comments()).to.instanceof(Relationship);
        expect(post.comments().first().user().name).to.equal('Jack')
        expect(post.comments().last().user().name).to.equal('Jones')
        expect(post.comments().get()).to.instanceof(Array)

        post.comments().add({id:1002, body: 'some new comment', user:{id: 102, name: 'James', email: 'james@tester.com'}})

        expect(post.comments().count()).to.equal(3)
        expect(post.comments().last().id).to.equal(1002)
    });


});

class User extends Model {
    constructor(data) {
        super(data)
    }

    posts() {
        return this.hasMany(new Post)
    }
}

class Post extends Model {
    constructor(data) {
        super(data)
    }

    user() {
        return this.hasOne(new User)
    }

    comments() {
        return this.hasMany(new Comment)
    }
}

class Comment extends Model {
    constructor(data) {
        super(data)
    }

    user() {
        return this.hasOne(new User)
    }

    post() {
        return this.hasOne(new Post)
    }
}