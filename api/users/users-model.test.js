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

it('[0] sanity checks', () => {
  expect(true).not.toBe(false);
  expect(1 + 1).toBe(2);
});

describe('[1] users model', () => {
  describe('getAll', () => {
    it('resolve all users in a table', async () => {
      const users = await Users.getAll();
      expect(users).toHaveLength(6);
    });
  });
  describe('getById', () => {
    it('resolves a user with given id, username', async () => {
      const user = await Users.getById(1);
      expect(user).toMatchObject({ id: 1, username: 'admin' });
    });
  });
  describe('insert', () => {
    it('creates a new user in db', async () => {
      await Users.insert({ username: 'SecretAgent' });
      const newUser = await db('users').where('id', 7).first();
      expect(newUser).toMatchObject({ id: 7, username: 'SecretAgent' });
    });
    it('resolves the new user with id, username', async () => {
      const user = await Users.insert({ username: 'SecretAgent' });
      expect(user).toMatchObject({ id: 7, username: 'SecretAgent' });
    });
  });
});
