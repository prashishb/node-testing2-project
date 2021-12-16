exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();

    table.string('username').unique().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
