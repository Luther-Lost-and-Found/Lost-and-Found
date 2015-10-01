var expect = require('chai').expect,
    request = require('superagent');

describe('When requested at /', function() {
    var baseUrl = 'http://localhost:3000/';
    it('should respond with index.html', function(done) {
        request.get(baseUrl).end(function assert(err, res){
            expect(err).to.not.be.ok;
            expect(res).to.have.property('status', 200);
            done();
        });
    });
});
