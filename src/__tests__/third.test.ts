import request from 'supertest';
import { describe, expect, test } from '@jest/globals';
import { server } from '../server';
import { ERRORS } from '../consts/errors';

describe('App', () => {
  const newUser = {
    username: 'Alice',
    age: 20,
    hobbies: ['reading', 'yoga'],
  };
  let userId: string;

  afterAll(() => {
    server.close();
  });

  test('should create a new user', async () => {
    const response = await request(server)
      .post('/api/users')
      .send(newUser)
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('username', 'Alice');
    expect(response.body).toHaveProperty('age', 20);
    expect(response.body).toHaveProperty('hobbies', ['reading', 'yoga']);
    expect(response.body).toHaveProperty('id');
    const { id } = response.body;
    userId = id;
  });

  test('should delete a specific user', async () => {
    const response = await request(server).delete(`/api/users/${userId}`);
    expect(response.status).toBe(204);
  });

  test('should return an error if user is deleted', async () => {
    const response = await request(server).delete(`/api/users/${userId}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', ERRORS.USER_NOT_FOUND);
  });

  test('should return empty array', async () => {
    const response = await request(server).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});
