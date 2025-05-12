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
  const updatedUser = {
    username: 'Alice',
    hobbies: ['reading', 'yoga', 'pilates'],
  };
  let userId: string;

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

  test('should return an error if required field is missing', async () => {
    const response = await request(server)
      .put(`/api/users/${userId}`)
      .send(updatedUser)
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      'error',
      ERRORS.MISSING_REQUIRED_FIELD
    );
  });

  test('should return a specific user', async () => {
    const response = await request(server).get(`/api/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', userId);
    expect(response.body).toHaveProperty('username', newUser.username);
    expect(response.body).toHaveProperty('age', newUser.age);
    expect(response.body).toHaveProperty('hobbies', newUser.hobbies);
  });
});
