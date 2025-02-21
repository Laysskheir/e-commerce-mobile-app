import request from 'supertest';
import { app } from '../../server';

describe('Category Routes', () => {
  test('should create a category', async () => {
    const response = await request(app)
      .post('/api/categories')
      .send({ name: 'Test Category' });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Test Category');
  });

  test('should get all categories', async () => {
    const response = await request(app).get('/api/categories');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});