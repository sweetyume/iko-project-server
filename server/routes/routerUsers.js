const { Router } = require('express');
const client = require('../db/connection');
const {
	getUsers,
	getUserById,
	createUser,
	editUsers,
	deleteUser
} = require('../controllers/users');
const { getAllArticlesByUserId } = require('../controllers/articles');
const { generateToken } = require('../Authentication');

const router = Router();

router.post('/register', async (req, res) => {
	const userInfos = {
		username: req.body.user.username,
		password: req.body.user.password,
		login: req.body.user.login
	};
	try {
		const addedUser = await createUser(userInfos);
		const token = generateToken(addedUser.id);
		res.cookie(token);
	} catch (error) {
		console.log(error);
		return res.status(500).send(error.message);
	}
	return res.status(200).send(userInfos);
});
router.get('/users/:id/articles', async (req, res) => {
	let queryResult = null;
	try {
		queryResult = await getAllArticlesByUserId(req.params.id);
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.send(
				new Error("Erreur dans l'acquisition des articles d'un user", error)
			);
	}
	return res.status(200).send(queryResult);
});

router.get('/users', async (req, res) => {
	let queryResult = null;
	try {
		queryResult = await getUsers(client);
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.send(new Error("Erreur dans l'acquisition des utilisateurs", error));
	}
	return res.status(200).send(queryResult.rows);
});

router.get('/users/:id', async (req, res) => {
	let getOneResult = null;
	try {
		getOneResult = await getUserById(req.params.id);
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.send(new Error("Erreur dans l'acquisition d'un user'", error));
	}
	return res.status(200).send(getOneResult);
});

router.put('/users/edit/:id', async (req, res) => {
	let editUserResult = null;
	try {
		// assign
		editUserResult = await editUsers(req.params.id, {
			username: req.body.username
		});
	} catch (error) {
		console.log(error);
		res.status(500).send(new Error("Erreur dans l'édition d'un user", error));
	}
	return res.status(200).send(editUserResult.rows);
});

router.delete('/users/delete/:id', async (req, res) => {
	let deleteUserResult = null;
	try {
		deleteUserResult = await deleteUser(req.params.id);
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.send(new Error("Erreur dans la suppression d'un user", error));
	}
	return res.status(200).send(deleteUserResult);
});

module.exports = router;
