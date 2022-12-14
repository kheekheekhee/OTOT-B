require("dotenv").config()
require("babel-core/register");
require("babel-polyfill");
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
import BENETHAN_DOE from './testdata/BenethanDoe.js'
import BENEDETTE_DOE from './testdata/BenedetteDoe.js'
import Contact from '../model/contactModel.js';

const mongoose = require("mongoose")
chai.use(chaiHttp)
const should = chai.should();
const TIMEOUTTIME = 10000

describe("Contacts", () => {
    describe("GET /api/contacts", () => {
        // Test should get all contacts
        it("should get all contacts", (done) => {
            chai.request(app)
                .get("/api/contacts")
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.property("status").eql("success")
                    res.body.should.have.property("message").eql("Contacts retrieved successfully")
                    done()
                })
        }).timeout(TIMEOUTTIME)
    })
    
    describe("GET /api/contacts/:id", () => {
        it("should get contact with the specified id", (done) => {
            const contact = new Contact(BENETHAN_DOE);
            contact.save((err, contact) => {
                chai.request(app)
                .get("/api/contacts/" + contact.id)
                .send(contact)
                .end((err, res) => {
                    should.exist(res.body)
                    res.should.have.status(200);
                    res.body.data.should.have.property('name').eql(BENETHAN_DOE.name);
                    res.body.data.should.have.property('email').eql(BENETHAN_DOE.email);
                    res.body.data.should.have.property('gender').eql(BENETHAN_DOE.gender);
                    res.body.data.should.have.property('phone').eql(BENETHAN_DOE.phone);
                    res.body.data.should.have.property('_id').eql(contact.id);
                    done()
                })
            })
        }).timeout(TIMEOUTTIME)
    })

    describe("POST /api/contacts", () => {
        it("should create a new contact", (done) => {
            var id;
            chai.request(app)
                .post("/api/contacts")
                .send(BENETHAN_DOE)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("New contact created!")
                    res.body.data.should.have.property('name').eql(BENETHAN_DOE.name);
                    res.body.data.should.have.property('email').eql(BENETHAN_DOE.email);
                    res.body.data.should.have.property('gender').eql(BENETHAN_DOE.gender);
                    res.body.data.should.have.property('phone').eql(BENETHAN_DOE.phone);
                    id = res.body.data._id
                    done()
                })
        }).timeout(TIMEOUTTIME)
    })

    describe("PUT /api/contacts/:id", () => {
        it("should update contact with the specified id", (done) => {
            const contact = new Contact(BENETHAN_DOE);
            contact.save((err, contact) => {
                chai.request(app)
                .put("/api/contacts/" + contact.id)
                .send(BENEDETTE_DOE)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql("Contact info updated")
                    res.body.data.should.have.property('name').eql(BENEDETTE_DOE.name);
                    res.body.data.should.have.property('email').eql(BENEDETTE_DOE.email);
                    res.body.data.should.have.property('gender').eql(BENEDETTE_DOE.gender);
                    res.body.data.should.have.property('phone').eql(BENEDETTE_DOE.phone);
                    res.body.data.should.have.property('_id').eql(contact.id);
                    done()
                })
            })
        }).timeout(TIMEOUTTIME)
    })

    describe("DELETE /api/contacts/:id", () => {
        it("should delete contact with the specified id", (done) => {
            const contact = new Contact(BENETHAN_DOE);
            contact.save((err, contact) => {
                chai.request(app)
                .delete("/api/contacts/" + contact.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql("success");
                    res.body.should.have.property('message').eql("Contact deleted");
                    done()
                })
            })
        }).timeout(TIMEOUTTIME)
    })
})
