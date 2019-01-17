const SQL = require("sql-template-strings");
const client = require("../db/connection");

module.exports = {
  getArticles: async client => {
    const query = SQL`
    SELECT
    *
    FROM articles
    `;
    const queryResult = await client.query(query);
    return queryResult;
  },
  getOneArticle: async id => {
    const getOneArticle = SQL`
    SELECT
     *
    FROM articles
    WHERE id = ${id}
    `;
    const getOneArticleResult = await client.query(getOneArticle);
    return getOneArticleResult;
  },
  createArticle: async articleInfos => {
    console.log(articleInfos.country, articleInfos.title);
    const insertArticle = SQL`
     INSERT INTO articles (
         country,
         title,
         description,
         created_at,
         updated_at

     ) VALUES (
         ${articleInfos.country},
         ${articleInfos.title},
         ${articleInfos.description},
         ${articleInfos.created_at},
         ${articleInfos.updated_at}
     ) RETURNING *
     `;
    const insertArticleResult = await client.query(insertArticle);
    return insertArticleResult;
  },
  editArticle: async (id, articleInfos) => {
    const editArticle = SQL`
     UPDATE articles
     SET title = ${articleInfos.title},
         country = ${articleInfos.country}
     WHERE id = ${id}
     RETURNING *
     `;
    const editArticleResult = await client.query(editArticle);
    return editArticleResult;
  },
  deleteArticle: async id => {
    const deleteArticle = SQL`
    DELETE FROM articles
    WHERE id = ${id}
    RETURNING *
    `;
    const deleteArticleResult = await client.query(deleteArticle);
    return deleteArticleResult;
  }
};
// const knex = require("../db/connection"); // la connection

// module.exports = {
//   getAll() {
//     return knex("users").select("*");
//   },
//   getOneArticle(id) {
//     return knex("users")
//       .where("id", id)
//       .first();
//   },
//   getOneByEmail(email) {
//     return knex("users")
//       .where("email", email)
//       .first();
//   },
//   createOne(user) {
//     return knex("users").insert(user, "*");
//   },
//   updateOne(id, user) {
//     return knex("users")
//       .where("id", id)
//       .update(user, "*");
//   },
//   deleteOne(id) {
//     return knex("users")
//       .where("id", id)
//       .del();
//   }
// };

// const knex = require("../db/connection"); // la connection

// module.exports = {
//   getAllArticles() {
//     return knex("articles").select("*");
//   },
//   getArticle(id) {
//     return knex("articles")
//       .where("id", id)
//       .first();
//   },
//   createArticle(article) {
//     return knex("articles").insert(article, "*");
//   },
//   updateArticle(id, article) {
//     return knex("articles")
//       .where("id", id)
//       .update(article, "*");
//   },
//   deleteArticle(id) {
//     return knex("articles")
//       .where("id", id)
//       .del();
//   }
// };
