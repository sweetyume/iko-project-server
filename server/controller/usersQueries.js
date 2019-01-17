const SQL = require("sql-template-strings");
const client = require("../db/connection");

module.exports = {
  getUsers: async client => {
    const query = SQL`
    SELECT
    *
    FROM users
    `;
    const queryResult = await client.query(query);
    return queryResult;
  },
  createUsers: async userInfos => {
    console.log(userInfos.password, userInfos.lastname);
    const insertUser = SQL`
     INSERT INTO users (
         username,
         credentials,
         login,
         email

     ) VALUES (
         ${userInfos.username},
         ${userInfos.credentials},
         ${userInfos.login},
         ${userInfos.email}
     ) RETURNING *
     `;
    const insertUserResult = await client.query(insertUser);
    return insertUserResult;
  },
  editUsers: async (id, userInfos) => {
    const editUser = SQL`
     UPDATE users
     SET username = ${userInfos.username},
         email = ${userInfos.email}
     WHERE id = ${id}
     RETURNING *
     `;
    const editUserResult = await client.query(editUser);
    return editUserResult;
  },
  deleteUsers: async id => {
    const deleteUser = SQL`
    DELETE FROM users
    WHERE id = ${id}
    RETURNING *
    `;
    const deleteUserResult = await client.query(deleteUser);
    return deleteUserResult;
  }
};
// const knex = require("../db/connection"); // la connection

// module.exports = {
//   getAll() {
//     return knex("users").select("*");
//   },
//   getOne(id) {
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
