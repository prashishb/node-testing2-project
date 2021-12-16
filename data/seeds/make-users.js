const users = [
  { username: 'admin' },
  { username: 'EthanHunt' },
  { username: 'JasonBourne' },
  { username: 'JamesBond' },
  { username: 'JohnWick' },
  { username: 'Nikita' },
];

exports.seed = function (knex, Promise) {
  return knex('users')
    .truncate()
    .then(function () {
      return knex('users').insert(users);
    });
};
