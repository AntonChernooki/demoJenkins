const request = require('supertest');
const { app } = require('../app');

describe('Info API', () => {
    it('should return list of films', async () => {
        const response = await request(app).get('/api/film');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true); 
    });

    it('should return a specific film by ID', async () => {
        const response = await request(app).get('/api/film/1');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', "1"); 
    });
});