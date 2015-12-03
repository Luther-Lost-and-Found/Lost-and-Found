var chai = require('chai'),
    chaiHttp = require('chai-http'),
    http = require('http'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    expect = chai.expect;

chai.use(chaiHttp);
chai.use(sinonChai);

describe('requests on undefined routes', function () {

    var server;

    beforeEach(function() {
        delete require.cache[require.resolve('../../server')];
        server = require('../../server.js').server;
    });

    afterEach(function(done) {
        server.close(done);
    });

    describe('unauthenticated requests', function () {

        it('should have status 401', function(done) {
            chai.request(server)
                .get('/asdfjkasjdkfajslfdjalks/')
                .end(function(err, res){
                    expect(err).to.not.be.ok;
                    expect(res).to.have.status(401);
                    done();
                });
        });
        it('should redirect to /', function(done) {
            chai.request(server)
                .get('/asdfjkasjdkfajslfdjalks/')
                .end(function(err, res){
                    expect(err).to.not.be.ok;
                    expect(res.text).to.contain('Redirecting to /');
                    done();
                });
        });
    });
    describe('authenticated requests', function () {

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

        it('should have status 404', function(done) {
            chai.request(server)
                .get('/asdfjkasjdkfajslfdjalks/')
                .end(function(err, res){
                    expect(err).to.not.be.ok;
                    expect(res).to.have.status(404);
                    done();
                });
        });
    });

})


