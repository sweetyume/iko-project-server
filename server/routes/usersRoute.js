const express = require("express");
const router = express.Router();
const client = require("../db/connection");

const {
  getUsers,
  getUserById,
  createUser,
  editUsers,
  deleteUser
} = require("../controllers/users");
const { getAllArticlesByUserId } = require("../controllers/articles");

router.get("/users/:id/articles", async (req, res) => {
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

router.get("/users", async (req, res) => {
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

router.get("/users/:id", async (req, res) => {
  let getOneResult = null;
  try {
    getOneResult = await getUserById(req.params.id);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new Error("Erreur dans l'acquisition d'un user'", error));
  }
  return res.status(200).send(getOneResult.rows);
});

router.post("/users", async (req, res) => {
  let insertUserResult = null;
  try {
    insertUserResult = await createUser({
      username: req.body.username,
      login: req.body.login,
      password: req.body.password
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(new Error("Erreur dans l'insertion d'un user", error));
  }
  return res.status(200).send(insertUserResult.rows);
});

router.put("/users/edit/:id", async (req, res) => {
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

router.delete("/users/delete/:id", async (req, res) => {
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
