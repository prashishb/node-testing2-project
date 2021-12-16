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
  let res;
  beforeAll(async () => {
    res = await request(server).get('/api/users');
  });
  it('responds with 200 OK', async () => {
    expect(res.status).toBe(200);
  });
  it('responds with all users', async () => {
    expect(res.body).toHaveLength(6);
  });
});

describe('[GET] /api/users/:id', () => {
  let res;
  beforeAll(async () => {
    res = await request(server).get('/api/users/1');
  });
  it('responds with 200 OK', async () => {
    expect(res.status).toBe(200);
  });
  it('responds with a single user', async () => {
    expect(res.body).toHaveProperty('id', 1);
  });
});

describe('[POST] /api/users', () => {
  let res;
  beforeAll(async () => {
    res = await request(server).post('/api/users').send({
      username: 'newUser',
    });
  });
  it('responds with 201 CREATED', async () => {
    expect(res.status).toBe(201);
  });
  it('responds with the new user', async () => {
    expect(res.body).toMatchObject({ id: 7, username: 'newUser' });
  });
  it('responds with the new (snapshot)', () => {
    expect(res.body).toMatchSnapshot();
  });
});

describe('[DELETE] /api/users/:id', () => {
  let res;
  let user;
  beforeAll(async () => {
    res = await request(server).delete('/api/users/1');
    user = await db('users').where({ id: 1 }).first();
  });
  it('responds with 200 OK', async () => {
    expect(res.status).toBe(200);
  });
  it('can delete the correct user', async () => {
    expect(user).not.toBeDefined();
  });
});
