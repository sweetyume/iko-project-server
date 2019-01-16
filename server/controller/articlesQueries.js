const knex = require("../db/connection"); // la connection

module.exports = {
  getAllArticles() {
    return knex("articles").select("*");
  },
  getArticle(id) {
    return knex("articles")
      .where("id", id)
      .first();
  },
  createArticle(article) {
    return knex("articles").insert(article, "*");
  },
  updateArticle(id, article) {
    return knex("articles")
      .where("id", id)
      .update(article, "*");
  },
  deleteArticle(id) {
    return knex("articles")
      .where("id", id)
      .del();
  }
};
