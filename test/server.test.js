var chai = require('chai'),
    chaiHttp = require('chai-http'),
    expect = chai.expect;

chai.use(chaiHttp);

describe('server should respond to request on /', function () {

    var server;

    beforeEach(function() {
        delete require.cache[require.resolve('../server')];
        server = require('../server.js').server;
    });

    afterEach(function(done) {
        server.close(done);
    });

    it('should have status 200', function(done) {
        chai.request(server)
            .get('/')
            .end(function(err, res){
                expect(err).to.not.be.ok;
                expect(res).to.have.status(200);
                done();
            });
    });
})

