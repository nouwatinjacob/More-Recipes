import chai, {expect} from 'chai';
import supertest from 'supertest';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);

const request = supertest(app);

// Test for API home route and invalid routes
describe('GET: /api/v1', () => {
  it('Should return status code 404 when user accesses non-existent route', (done) => {
    chai.request(app)
      .get('/api')
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.eql({
          message: 'Invalid Url'
        });
        done();
      });
  });

  it('Should return status code 404 when user accesses /api/v ', (done) => {
    chai.request(app)
      .get('/api/v')
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.eql({
          message: 'Invalid Url'
        });
        done();
      });
  });

  it('should return \'Please navigate ' +
    'this API via \'/api/v1/\' url prefix\'', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.eql({
          message: 'Invalid Url'
        });
        done();
      });
  });

  it('should return \'invalid link\' (GET /users)', (done) => {
    chai.request(app)
      .get('/users')
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.eql({
          message: 'Invalid Url'
        });
        done();
      });
  });

  it('should return \'invalid link\' (POST /api/recipes)', (done) => {
    chai.request(app)
      .get('/api/recipes')
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.eql({
          message: 'Invalid Url'
        });
        done();
      });
  });


});