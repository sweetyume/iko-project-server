import knex from "../db/connection"; // la connection

module.exports = {
  getAll() {
    return knex("users").select("*");
  },
  getOne(id) {
    return knex("users")
      .where("user_id", id)
      .first();
  },
  create(user) {
    return knex("users").insert(user, "*");
  },
  updateOne(id, user) {
    return knex("users")
      .where("user_id", id)
      .update(user, "*");
  },
  deleteOne(id) {
    return knex("users")
      .where("user_id", id)
      .del();
  }
};
