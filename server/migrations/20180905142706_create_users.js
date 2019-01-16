exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", table => {
    table
      .increments("id")
      .unsigned()
      .primary();
    table.string("firstname");
    table.string("lastname");
    table.string("username");
    table.string("credentials");
    table.string("login");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
