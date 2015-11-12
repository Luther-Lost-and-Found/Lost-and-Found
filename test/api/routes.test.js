var chai = require('chai'),
    chaiHttp = require('chai-http'),
    expect = chai.expect;

chai.use(chaiHttp);

describe('unauthenticated requests', function () {

    var server;

    beforeEach(function() {
        delete require.cache[require.resolve('../../server')];
        server = require('../../server.js');
    });

    afterEach(function(done) {
        server.close(done);
    });

    it('should have status 401', function(done) {
        chai.request(server)
            .get('/itemlist/')
            .end(function(err, res){
                expect(err).to.not.be.ok;
                expect(res).to.have.status(401);
                done();
            });
    });
    it('should redirect to /', function(done) {
        chai.request(server)
            .get('/itemlist/')
            .end(function(err, res){
                expect(err).to.not.be.ok;
                expect(res.text).to.contain('Redirecting to /#/');
                done();
            });
    });

})


