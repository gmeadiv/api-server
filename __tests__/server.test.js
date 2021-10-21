'use strict';

const { db } = require('../src/models');
const supertest = require('supertest');
const app = require('../src/server');
const request = supertest(app.server);

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});

describe('Testing our express server', () => {
  it('should fetch all food items on GET /food', async () => {
    const response = await request.get('/food');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });
});