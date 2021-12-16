const db = require('../../data/db-config');

function getAll() {
  return db('users');
}

function getById(id) {
  return db('users').where({ id }).first();
}

async function insert(user) {
  return db('users')
    .insert(user)
    .then(([id]) => {
      return getById(id);
    });
}

async function update(id, changes) {
  return db('users').where({ id }).update(changes);
}

function remove(id) {
  return db('users').where({ id }).del();
}

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
};
