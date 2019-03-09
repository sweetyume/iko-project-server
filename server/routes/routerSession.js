const express = require('express');
const { generateToken } = require('../Authentication');
const verifyUser = require('../controllers/verifyUser');
const router = express.Router();

router.post('/login', async (req, res) => {
	let userToLogin = null;
	try {
		userToLogin = await verifyUser(req.body.login, req.body.password);
	} catch (error) {
		console.log('Erreur dans verifyUser :', error);
		return res.status(500).json(error.message);
	}

	res.cookie('token', generateToken(userToLogin.id));

	res.status(200).send(`Bienvenue, ${userToLogin.username}`);
});

router.get('/logout', (req, res) => {
	res.clearCookie('token');

	res.status(200).send('token deleted');
});
module.exports = router;
