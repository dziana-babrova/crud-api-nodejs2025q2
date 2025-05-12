import request from 'supertest';
import { describe, expect, test } from '@jest/globals';
import { server } from '../server';

describe('App', () => {
  const newUser = {
    username: 'Alice',
    age: 20,
    hobbies: ['reading', 'yoga'],
  };
  const updatedUser = {
    username: 'Alice',
    age: 21,
    hobbies: ['reading', 'yoga', 'pilates'],
  };
  let userId: string;

  afterAll(() => {
    server.close();
  });

  test('should return empty array on start', async () => {
    const response = await request(server).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
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

  test('should return a specific user', async () => {
    const response = await request(server).get(`/api/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', userId);
    expect(response.body).toHaveProperty('username', newUser.username);
    expect(response.body).toHaveProperty('age', newUser.age);
    expect(response.body).toHaveProperty('hobbies', newUser.hobbies);
  });

  test('should update a specific user', async () => {
    const response = await request(server)
      .put(`/api/users/${userId}`)
      .send(updatedUser)
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', userId);
    expect(response.body).toHaveProperty('username', updatedUser.username);
    expect(response.body).toHaveProperty('age', updatedUser.age);
    expect(response.body).toHaveProperty('hobbies', updatedUser.hobbies);
  });

  test('should delete a specific user', async () => {
    const response = await request(server).delete(`/api/users/${userId}`);
    expect(response.status).toBe(204);
  });
});
