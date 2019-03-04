const SQL = require("sql-template-strings");
const client = require("../db/connection");
const encryptPassword = require("./authentication/encryptPassword");

const getUsers = async client => {
  const query = SQL`
    SELECT
    *
    FROM users
    `;
  const queryResult = await client.query(query);
  return queryResult;
};
const getUserById = async id => {
  const getOne = SQL`
    SELECT
     *
    FROM users
    WHERE id = ${id}
    `;
  const getOneResult = await client.query(getOne);
  return getOneResult;
};
const getUserByLogin = async login => {
  const getOne = SQL`
    SELECT
     *
    FROM users
    WHERE login = ${login}
    `;
  const getOneResult = await client.query(getOne);
  return getOneResult.rows[0];
};
const createUser = async newUser => {
  if (await verifyUsernameExists(newUser.login)) {
    throw new Error("Email déjà utilisé");
  }
  const encryptedPassword = await encryptPassword(newUser.password);
  console.log(newUser.password, newUser.username);
  const insertUser = SQL`
     INSERT INTO users (
         username,
         password,
         login

     ) VALUES (
         ${newUser.username},
         ${encryptedPassword},
         ${newUser.login}
     ) RETURNING *
     `;
  const insertUserResult = await client.query(insertUser);
  return insertUserResult.rows[0];
};
const verifyUsernameExists = async login => {
  const verify = SQL`
    SELECT 
    *
    FROM users 
    WHERE login = ${login}
    `;
  const retrievedUser = await client.query(verify);
  if (retrievedUser.rowCount) {
    return true;
  }
  return false;
};
const editUsers = async (id, userInfos) => {
  const encryptedPassword = await encryptPassword(userInfos.password);
  const editUser = SQL`
     UPDATE users
     SET username = ${userInfos.username}
         login = ${userInfos.login}
         password = ${encryptedPassword}
     WHERE id = ${id}
     RETURNING *
     `;
  const editUserResult = await client.query(editUser);
  return editUserResult.rows[0];
};
const deleteUser = async id => {
  const deleteUser = SQL`
    DELETE FROM users
    WHERE id = ${id}
    RETURNING *
    `;
  const deleteUserResult = await client.query(deleteUser);
  return deleteUserResult;
};

module.exports = {
  getUsers,
  getUserById,
  getUserByLogin,
  createUser,
  verifyUsernameExists,
  editUsers,
  deleteUser
};
