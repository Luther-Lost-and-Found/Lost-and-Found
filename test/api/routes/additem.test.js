var chai = require('chai'),
    chaiHttp = require('chai-http'),
    sinonChai = require('sinon-chai'),
    sinon = require('sinon'),
    http = require('http'),
    expect = chai.expect;

chai.use(chaiHttp);
chai.use(sinonChai);

describe('add item', function () {

    var server;

    beforeEach(function() {
        delete require.cache[require.resolve('../../../server')];
        server = require('../../../server.js').server;
    });

    afterEach(function(done) {
        server.close(done);
    });

    describe('unauthenticated request', function() {
        describe('post request', function() {
            it('should have status 401', function(done) {
                chai.request(server)
                    .post('/additem')
                    .end(function(err, res){
                        expect(err).to.not.be.ok;
                        expect(res).to.have.status(401);
                        done();
                    });
            });
            it('should redirect to /', function(done) {
                chai.request(server)
                    .post('/additem')
                    .end(function(err, res) {
                        expect(err).to.not.be.ok;
                        expect(res.text).to.contain('Redirecting to /');
                        done();
                    });
            });
        });
    });

    describe('authenticated request', function() {
        beforeEach(function() {
            // overriding authentication checking
            // will treat every request in this describe block as authenticated
            req = http.IncomingMessage.prototype;
            stub = sinon.stub(req, 'isAuthenticated');
            stub.returns(true);
            // mocked user
            req.user = {
                norsekeyID: '111111',
                password: '$2a$10$p1LerZ.GmYkKRHNQS5UPyeZAjhEJ9uFgn2kEmns0mmTsqr/b/5bRi',
                locationID: 1,
                first_name: 'Super',
                last_name: 'Senior',
                email: 'super@senior.edu' };
        });

        afterEach(function() {
            // restore auth to normal
            stub.restore();
            delete req.user;
        });

        describe('post request', function() {
            it('should', function(done) {
                chai.request(server)
                    .post('/additem')
                    .end(function(err, res){
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        done();
                    });
            });
        });
    });
})


