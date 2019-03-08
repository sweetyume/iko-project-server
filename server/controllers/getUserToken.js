const jwt = require('jsonwebtoken');
const { getOneUser } = require('./users');

const getUserFromToken = async jwtToken => {
	if (!jwtToken) {
		throw new Error('Pas de Token');
	}

	const verifiedToken = jwt.verify(jwtToken, process.env.JWT_SECRET);
	if (!verifiedToken) {
		throw new Error('Décodage du token échoué');
	}

	const user = await getOneUser(verifiedToken.id);
	return user;
};

module.exports = getUserFromToken;
