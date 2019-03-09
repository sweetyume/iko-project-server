const express = require('express');
const router = express.Router();
const moment = require('moment');

const {
	getComments,
	getAllcommentsByArticleId,
	getOneComment,
	createComment,
	editComment,
	deleteComment
} = require('../controllers/comments');

router.get('/articles/comments', async (req, res) => {
	let queryResult = null;
	try {
		queryResult = await getComments(client);
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.send(new Error("Erreur dans l'acquisition des comments", error));
	}
	return res.status(200).send(queryResult.rows);
});

router.get('/articles/:id/comments', async (req, res) => {
	let queryResult = null;
	try {
		queryResult = await getAllcommentsByArticleId(req.params.id);
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.send(
				new Error("Erreur dans l'acquisition des comments d'un article", error)
			);
	}
	return res.status(200).send(queryResult);
});

router.get('/articles/:id/comments/:id', async (req, res) => {
	let getOneCommentResult = null;
	try {
		getOneCommentResult = await getOneComment(req.params.id);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.send(new Error("Erreur dans l'acquisition d'un comment'", error));
	}
	return res.status(200).send(getOneCommentResult.rows);
});

router.post('/articles/:id/comments', async (req, res) => {
	let insertCommentResult = null;
	try {
		insertCommentResult = await createComment({
			content: req.body.content,
			user_id: req.body.user_id,
			article_id: req.body.article_id,
			created_at: moment()
		});
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.send(new Error("Erreur dans l'insertion d'un comment", error));
	}
	return res.status(200).send(insertCommentResult);
});

router.put('/articles/:id/comments/:id', async (req, res) => {
	let editCommentResult = null;
	try {
		// assign
		editCommentResult = await editComment(req.params.id, {
			content: req.body.content,
			user_id: req.body.user_id,
			created_at: req.body.created_at
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.send(new Error("Erreur dans l'édition d'un comment", error));
	}
	return res.status(200).send(editCommentResult.rows);
});

router.delete('/articles/:id/comments/:id', async (req, res) => {
	let deleteCommentResult = null;
	try {
		deleteCommentResult = await deleteComment(req.params.id);
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.send(new Error("Erreur dans la suppression d'un comment", error));
	}
	return res.status(200).send(deleteCommentResult);
});

module.exports = router;
