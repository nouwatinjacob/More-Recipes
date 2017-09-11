import jwt from 'jsonwebtoken';
import chai, {expect} from 'chai';
import supertest from 'supertest';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);

const request = supertest(app);

describe('/POST User Sign Up validation Test', () => {
  it('should return \'Password must be at least 6 characters!\'', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .set('Accept', 'application/json')
      .send({
        name: 'Lawal Lanre',
        username: 'Larrystone',
        email: 'jaysansa@gmai.com',
        password: 'Hack',
        telephone: '08064557366',
        user_image: 'data.png',
        verify_password: 'Hack'
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.eql({
          message: {
            password: [
              'The password must be at least 6 characters.'
            ]
          }

        });
        done();
      });
  });

  it('should return \'Name must be at least 3 characters!\'', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .set('Accept', 'application/json')
      .send({
        name: 'me',
        username: 'Larrystone',
        email: 'jaysansa@gmai.com',
        password: 'Hacker1',
        telephone: '08064557366',
        user_image: 'data.png',
        verify_password: 'Hacker1'
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.deep.equal({
          message: {
            name: [
              'The name must be at least 3 characters.'
            ]
          }
        });
        done();
      });
  });

  it('should return \'Error Creating user\' for null name', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .set('Accept', 'application/json')
      .send({
        username: 'Larrystone',
        email: 'jaysansa@gmai.com',
        password: 'Hacker1',
        telephone: '08064557366',
        user_image: 'data.png',
        verify_password: 'Hacker1'
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.deep.equal({
          message: {
            name: [
              'The name field is required.'
            ]
          }
        });
        done();
      });
  });

  it('should return \'Error Creating user\' for null username', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .set('Accept', 'application/json')
      .send({
        name: 'Jacob',
        email: 'jaysansa@gmai.com',
        password: 'Hacker1',
        telephone: '08064557366',
        user_image: 'data.png',
        verify_password: 'Hacker1'
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.deep.equal({
          message: {
            username: [
              'The username field is required.'
            ]
          }
        });
        done();
      });
  });

  it('should return Username must be at least 3 characters!', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .set('Accept', 'application/json')
      .send({
        name: 'Jacob',
        username: 'ki',
        email: 'jaysansa@gmai.com',
        password: 'Hacker1',
        telephone: '08064557366',
        user_image: 'data.png',
        verify_password: 'Hacker1'
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.deep.equal({
          message: {
            username: [
              'The username must be at least 3 characters.'
            ]
          }
        });
        done();
      });
  });

  it('should return \'Error Creating user\' for null telephone', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .set('Accept', 'application/json')
      .send({
        name: 'Jacob',
        username: 'sansaristic',
        email: 'jaysansa@gmai.com',
        password: 'Hacker1',
        user_image: 'data.png',
        verify_password: 'Hacker1'
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.deep.equal({
          message: {
            telephone: [
              'The telephone field is required.'
            ]
          }
        });
        done();
      });
  });

});
