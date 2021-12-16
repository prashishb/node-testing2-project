const express = require('express');
const Users = require('./users/users-model');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the API' });
});

server.get('/api/users', (req, res) => {
  Users.getAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

server.get('/api/users/:id', async (req, res) => {
  res.json(await Users.getById(req.params.id));
});

module.exports = server;
