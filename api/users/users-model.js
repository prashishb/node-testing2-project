const db = require('../../data/db-config');

function getAll() {
  return db('users');
}

function getById(id) {
  return db('users').where({ id }).first();
}

async function insert(user) {
  return null;
}

async function update(id, changes) {
  return null;
}

function remove(id) {
  return null;
}

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
};
