const SQL = require('sql-template-strings');
const client = require('../db/connection');
const encryptPassword = require('./authentication/encryptPassword');

const getUsers = async client => {
	const query = SQL`
    SELECT
    *
    FROM users
    `;
	const queryResult = await client.query(query);
	return queryResult;
};
const getUserById = async userId => {
	const getOne = SQL`
    SELECT
     *
    FROM users
    WHERE id = ${userId}
    `;
	const results = await client.query(getOne);
	return results.rows[0];
};
const getOneUser = async userId => {
	const getOne = SQL`
  SELECT 
    login,
    username, 
    password,
    id
  FROM users
  WHERE id = ${userId}
  `;
	const getOneResult = await client.query(getOne);
	if (!getOneResult.rowCount) {
		throw new Error('Pas de User avec id :', userId);
	}
	return getOneResult.rows[0];
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
		throw new Error('Email déjà utilisé');
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
const editUsers = async (userId, userInfos) => {
	const encryptedPassword = await encryptPassword(userInfos.password);
	const editUser = SQL`
     UPDATE users
        SET username = ${userInfos.username}
            login = ${userInfos.login}
            password = ${encryptedPassword}
        WHERE id = ${userId}
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
	getOneUser,
	getUserByLogin,
	createUser,
	verifyUsernameExists,
	editUsers,
	deleteUser
};
