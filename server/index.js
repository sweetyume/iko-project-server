const auth = require("./controller/auth");
const users = require("./controller/usersQueries");
const articles = require("./controller/articlesQueries");

module.exports = {
  auth,
  users,
  articles
};
