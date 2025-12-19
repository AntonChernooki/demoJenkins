
const request = require('supertest');
const { app } = require('../app'); 

describe('Order API', () => {
    it('should create a new order successfully', async () => {
        const response = await request(app)
            .post('/api/orders')
            .send({
                user_id: 1,
                film_session_id: 1,
                cost: 15.50,
                purchase: true,
                
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.cost).toBe(15.50);
    });

    it('should return 400 if required fields are missing', async () => {
        const response = await request(app)
            .post('/api/orders')
            .send({
                user_id: 1,
                cost: 15.50,
                purchase: true,
            });
        expect(response.status).toBe(400);
    });
});