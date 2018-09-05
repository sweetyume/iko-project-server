exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", table => {
    table
      .increments("user_id")
      .unsigned()
      .primary();
    table.string("user_firstname").notNullable();
    table.string("user_lastname").notNullable();
    table.string("user_username").notNullable();
    table.string("user_email");
    table.string("user_password");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
