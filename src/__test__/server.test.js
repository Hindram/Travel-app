const app = require('../server/index');
const request = require('supertest');
import "babel-polyfill"

describe('Server Test', () => {
    test('response = 200', async () => {
        const res = await request(app).get('/test_server');
        expect(res.statusCode).toBe(200);
    });
});