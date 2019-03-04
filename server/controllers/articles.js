const SQL = require("sql-template-strings");
const client = require("../db/connection");

const getArticle = async client => {
  const query = SQL`
    SELECT
    *
    FROM articles
    `;
  const queryResult = await client.query(query);
  return queryResult;
};
const getOneArticle = async id => {
  const getOneArticle = SQL`
    SELECT
      title,
      country,
      description,
      image_file_path
    FROM articles
    WHERE id = ${id}
    `;
  const getOneArticleResult = await client.query(getOneArticle);
  return getOneArticleResult.rows[0];
};
const getAllArticlesByUserId = async id => {
  const getAllArticles = SQL`
    SELECT 
      title,
      country,
      description,
      image_file_path
    FROM articles
    INNER JOIN users AS usr ON usr.id = articles.user_id
    WHERE usr.id = ${id}
    `;
  const getAllArticlesResult = await client.query(getAllArticles);
  return getAllArticlesResult.rows;
};
const createArticle = async articleInfos => {
  console.log(articleInfos.country, articleInfos.title);
  const insertArticle = SQL`
     INSERT INTO articles (
         country,
         title,
         description,
         created_at,
         updated_at,
         user_id,
         image_file_path

     ) VALUES (
         ${articleInfos.country},
         ${articleInfos.title},
         ${articleInfos.description},
         ${articleInfos.created_at},
         ${articleInfos.updated_at},
         ${articleInfos.user_id},
        ${articleInfos.imageFilePath}
     ) RETURNING *
     `;
  const insertArticleResult = await client.query(insertArticle);
  return insertArticleResult;
};
const editArticle = async (id, articleInfos) => {
  const editArticle = SQL`
     UPDATE articles
     SET title = ${articleInfos.title},
         country = ${articleInfos.country},
         description = ${articleInfos.description},
         user_id = ${articlesInfos.user_id}
     WHERE id = ${id}
     RETURNING *
     `;
  const editArticleResult = await client.query(editArticle);
  return editArticleResult;
};
const deleteArticle = async id => {
  const deleteArticle = SQL`
    DELETE FROM articles
    WHERE id = ${id}
    RETURNING *
    `;
  const deleteArticleResult = await client.query(deleteArticle);
  return deleteArticleResult;
};

module.exports = {
  getArticle,
  getOneArticle,
  getAllArticlesByUserId,
  createArticle,
  editArticle,
  deleteArticle
};
