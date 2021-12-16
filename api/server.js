const express = require('express');
const Users = require('./users/users-model');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send('Welcome to the API!');
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
  res.status(200).json(await Users.getById(req.params.id));
});

server.post('/api/users', async (req, res) => {
  res.status(201).json(await Users.insert(req.body));
});

server.delete('/api/users/:id', async (req, res) => {
  res.status(200).json(await Users.remove(req.params.id));
});

module.exports = server;
