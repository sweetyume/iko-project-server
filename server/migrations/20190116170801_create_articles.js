exports.up = function(knex, Promise) {
  return knex.schema.createTable("articles", function(table) {
    table.increments("id").primary();
    table.string("country").notNullable();
    table.string("title").notNullable();
    table.string("description").notNullable();
    table
      .integer("user_id")
      .references("id")
      .inTable("users");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("articles");
};
