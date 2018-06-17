process.env.NODE_ENV = 'test';

var app = require('../index');
var User = require('../models/user');
var Cafe = require('../models/cafe');
var Race = require('../models/race');
var request = require('supertest');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

describe('Cafe', function() {
    describe('#save()', function() {
        it('should save without error', function(done) {
            var cafe = new Cafe();
            cafe.name = "Luna's café";
            cafe.save(done);
        });
    });


});

describe('Race', function() {
    describe('#save()', function() {
        it('should save without error', function(done) {
            var race = new Race();
            race.name = "Luna's Race";
            race.starttime = "12:00";
            race.endtime = "17:00";
            race.save(done);
        });
    });

});

describe('Cafes', () => {
    // beforeEach((done) => {
    //     Product.remove({}, (err) => {
    //         done();
    //     });
    // });
    describe('/GET cafe', function (done) {
        it('should return a 200 response and cafes', function (done) {
            request(app).get('/cafes')
                .set('real-type', 'application/json')
                .end(function (err, res) {
                    res.should.have.status(200);
                    done();
                });
        });

        it('should return a 200 response and cafes in html', function (done) {
            request(app).get('/cafes')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.text.should.be.a("string");
                    done();
                });
        });

        it('it should GET a cafe by id', (done) => {
            let cafe = new Cafe({
                name: "Test Cafe",
                placeid: "asdfasdfasdfasdf"});
            cafe.save((err, cafe) => {
                request(app).get('/cafes/' + cafe._id)
                    .set('real-type', 'application/json')
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name');
                        res.body.should.have.property('placeid');
                        res.body.should.have.property('_id').eql(cafe.id);
                        done();
                    });
            });
        });
    });

    describe('/Post cafe', function (done) {
        it('should return a 200 response and post cafe', function (done) {
            let cafe = {
                name: "Test Cafe",
                placeid: "sdfsdadgadgadga",
            };
            request(app).post('/cafes/')
                .set('real-type', 'application/json')
                .send(cafe)
                .end(function (err, res) {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/Put cafe', function (done) {
        it('should return a 200 response and put cafe', function (done) {
            let cafe = new Cafe({
                name: "Test Cafe",
                placeid: "sdfsdadgadgadga",
            });
            cafe.save((err, cafe) => {
                request(app).put('/cafes/' + cafe._id)
                    .set('real-type', 'application/json')
                    .send({
                        name: "Test2 cafe"
                    })
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.body.should.have.property('message').eql("Cafe updated!");
                        done();
                    });
            });
        });
    });

    describe('/Delete cafe', function (done) {
        it('should return a 200 response and delete cafe', function (done) {
            let cafe = new Cafe({
                name: "Test Cafe",
                placeid: "sdfsdadgadgadga",
            });
            cafe.save((err, cafe) => {
                request(app).delete('/cafes/' + cafe._id)
                    .set('real-type', 'application/json')
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.body.should.have.property('message').eql("Successfully deleted!");
                        done();
                    });
            });
        });
    });



});

describe('Races', () => {
    // beforeEach((done) => {
    //     Product.remove({}, (err) => {
    //         done();
    //     });
    // });
    describe('/GET race', function (done) {
        it('should return a 200 response and races', function (done) {
            request(app).get('/races')
                .set('real-type', 'application/json')
                .end(function (err, res) {
                    res.should.have.status(200);
                    done();
                });
        });

        it('should return a 200 response and races in html', function (done) {
            request(app).get('/races')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.text.should.be.a("string");
                    done();
                });
        });

        it('it should GET a race by id', (done) => {
            let race = new Race({
                name: "Test Race",
                starttime: "12:00",
                endtime: "14:00"});
            race.save((err, race) => {
                request(app).get('/races/' + race._id)
                    .set('real-type', 'application/json')
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name');
                        res.body.should.have.property('starttime');
                        res.body.should.have.property('endtime');
                        res.body.should.have.property('_id').eql(race.id);
                        done();
                    });
            });
        });
    });

    describe('/Post race', function (done) {
        it('should return a 200 response and post race', function (done) {
            let race = {
                name: "Test race",
                starttime: "12:00",
                endtime: "14:00"
            };
            request(app).post('/races/')
                .set('real-type', 'application/json')
                .send(race)
                .end(function (err, res) {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/Put race', function (done) {
        it('should return a 200 response and put race', function (done) {
            let race = new Race({
                name: "Test Race",
                starttime: "12:00",
                endtime: "14:00",
            });
            race.save((err, race) => {
                request(app).put('/races/' + race._id)
                    .set('real-type', 'application/json')
                    .send({
                        name: "Test2 race",
                        starttime: "13:00",
                        endtime: "15:00",
                    })
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.body.should.have.property('message').eql("Race updated!");
                        done();
                    });
            });
        });
    });

    describe('/Delete race', function (done) {
        it('should return a 200 response and delete race', function (done) {
            let race = new Race({
                name: "Test Race",
                starttime: "12:00",
                endtime: "14:00"
            });
            race.save((err, race) => {
                request(app).delete('/races/' + race._id)
                    .set('real-type', 'application/json')
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.body.should.have.property('message').eql("Successfully deleted!");
                        done();
                    });
            });
        });
    });



});

// describe('Race', function() {
//     describe('#save()', function() {
//         it('should not save with bad time format', function(done) {
//             var race = new Race();
//             race.name = "Luna's Race";
//             race.starttime = "12:00";
//             race.endtime = "25:00";
//             request(app)
//                 .post('/races/create')
//                 .send(race)
//                 .end(function(err, res){
//                     if(err) done(err);
//                 })
//         });
//     });
//
// });
