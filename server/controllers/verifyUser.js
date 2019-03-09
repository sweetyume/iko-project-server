const SQL = require('sql-template-strings');
const bcrypt = require('bcrypt');
const client = require('../db/connection');

const verifyUser = async (login, password) => {
	const verify = SQL`
    SELECT 
      username,
      password,
      login,
      id
    FROM users
    WHERE login = ${login}
    `;
	const retrievedUser = await client.query(verify);
	if (!retrievedUser.rowCount) {
		throw new Error("Pas d'utilisateur avec ce compte");
	}
	const passwordRight = await bcrypt.compare(
		password,
		retrievedUser.rows[0].password
	);
	if (!passwordRight) {
		throw new Error('Mot de passe incorrect');
	}
	return retrievedUser.rows[0];
};
module.exports = verifyUser;
