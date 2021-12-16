const server = require('./server');
const request = require('supertest');
const db = require('../data/db-config');

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

it('is the correct env', () => {
  expect(process.env.NODE_ENV).toBe('testing');
});
describe('[GET] /api/users', () => {
  it('responds with 200 OK', async () => {
    const res = await request(server).get('/api/users');
    expect(res.status).toBe(200);
  });
  it('responds with all users', async () => {
    const res = await request(server).get('/api/users');
    expect(res.body).toHaveLength(6);
  });
});
