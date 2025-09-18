import request from 'supertest';
import app from '../src/app.js';

describe('GET /', () => {
  it('should return Server is running', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Server is running');
  });
});