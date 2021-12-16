const db = require('../../data/db-config');
const Users = require('./users-model');

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

it('[0] sanity check', () => {
  expect(true).not.toBe(false);
});
