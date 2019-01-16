const knex = require("../db/connection"); // la connection

module.exports = {
  getAll() {
    return knex("users").select("*");
  },
  getOne(id) {
    return knex("users")
      .where("id", id)
      .first();
  },
  getOneByEmail(email) {
    return knex("users")
      .where("email", email)
      .first();
  },
  createOne(user) {
    return knex("users").insert(user, "*");
  },
  updateOne(id, user) {
    return knex("users")
      .where("id", id)
      .update(user, "*");
  },
  deleteOne(id) {
    return knex("users")
      .where("id", id)
      .del();
  }
};
