const SQL = require("sql-template-strings");
const client = require("../db/connection");

const getComments = async client => {
  const query = SQL`
    SELECT
    *
    FROM comments
    `;
  const queryResult = await client.query(query);
  return queryResult;
};
const getOneComment = async id => {
  const getOneComment = SQL`
    SELECT
      content,
      user_id
    FROM comments
    WHERE id = ${id}
    `;
  const getOneCommentResult = await client.query(getOneComment);
  return getOneCommentResult.rows[0];
};
const getAllcommentsByArticleId = async id => {
  const getAllComments = SQL`
    SELECT 
      content,
      article.user_id
    FROM comments
    INNER JOIN articles AS article ON article.id = comments.article_id
    WHERE article.id = ${id}
    `;
  const getAllCommentsResult = await client.query(getAllComments);
  return getAllCommentsResult.rows;
};
const createComment = async commentInfos => {
  const insertComment = SQL`
     INSERT INTO comments (
         content,
         user_id,
         created_at,
         article_id
     ) VALUES (
        ${commentInfos.content},
        ${commentInfos.user_id},
        ${commentInfos.created_at},
        ${commentInfos.article_id}
     ) RETURNING *
     `;
  const insertCommentResult = await client.query(insertComment);
  return insertCommentResult;
};
const editComment = async (id, commentInfos) => {
  const editComment = SQL`
     UPDATE comments
     SET content = ${commentInfos.content},
         user_id = ${commentInfos.user_id}
     WHERE id = ${id}
     RETURNING *
     `;
  const editCommentResult = await client.query(editComment);
  return editCommentResult;
};
const deleteComment = async id => {
  const deleteComment = SQL`
    DELETE FROM comments
    WHERE id = ${id}
    RETURNING *
    `;
  const deleteCommentResult = await client.query(deleteComment);
  return deleteCommentResult;
};

module.exports = {
  getComments,
  getOneComment,
  getAllcommentsByArticleId,
  createComment,
  editComment,
  deleteComment
};
