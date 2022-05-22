const request = require('supertest');
const baseUrl = 'http://localhost:8080';
beforeAll(done => {
    done()
  })
  
let token = ''
describe('root', () => {
	it('home', async () => {
		const response = await request(baseUrl)
        .get('/');
        expect(response.statusCode).toEqual(200);
        expect(response.body.message).toEqual('Welcome Xblocks Development.');
	});
})

describe('auth', () => {
  it('sign_in success', async () => {
    const service = {
      username: "soegidev",
      password: "fajarsoegi"
    };
		const response = await request(baseUrl)
        .post('/api/auth/signin')
        .send(service);
        expect(response.statusCode).toEqual(200);
        token = response.body.accessToken
      });
  it('sign_in not success', async () => {
		const response = await request(baseUrl)
        .post('/api/auth/signin')
        .send({username: 'soegidev',password: ''});
        expect(response.status).toEqual(401);
        expect(response.body.message).toEqual('Invalid Password!');
      });
  it('sign_in not success username', async () => {
      const response = await request(baseUrl)
          .post('/api/auth/signin')
          .send({username: '',password: 'fajarsoegi'});
          expect(response.status).toEqual(404);
          expect(response.body.message).toEqual('User Not Found!');
        });
  it('get Profile', async () => {
      const response = await request(baseUrl)
          .get('/api/test/profile')
          .set('x-access-token',token);
          expect(response.status).toEqual(200);
        });
  it('get Profile Not Token', async () => {
      const response = await request(baseUrl)
          .get('/api/test/profile')
          .set('x-access-token','');
          expect(response.status).toEqual(403)
        });
})

afterAll(done => {
    done()
  })