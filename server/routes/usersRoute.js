const express = require("express");
const router = express.Router();
// const knex = require("../db/connection"); // la connection
const client = require("../db/connection");

const {
  getUsers,
  createUsers,
  editUsers,
  deleteUsers
} = require("../controller/usersQueries");

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

router.post("/add", async (req, res) => {
  let insertUserResult = null;
  try {
    insertUserResult = await createUsers({
      username: req.body.username,
      login: req.body.login,
      email: req.body.email,
      password: req.body.password
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(new Error("Erreur dans l'insertion d'un user", error));
  }
  return res.status(200).send(insertUserResult.rows);
});

router.put("/edit/:id", async (req, res) => {
  let editUserResult = null;
  try {
    // assign
    editUserResult = await editUsers(req.params.id, {
      username: req.body.username,
      email: req.body.email
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(new Error("Erreur dans l'édition d'un user", error));
  }
  return res.status(200).send(editUserResult.rows);
});

router.delete("/delete/:id", async (req, res) => {
  let deleteUserResult = null;
  try {
    deleteUserResult = await deleteUsers(req.params.id);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new Error("Erreur dans la suppression d'un user", error));
  }
  return res.status(200).send(deleteUserResult);
});

module.exports = router;

// function isValidId(req, res, next) {
//   if (!isNaN(req.params.id)) return next();
//   next(new Error("Invalid ID"));
// }
// function validUser(user) {
//   const hasUsername =
//     typeof user.username == "string" && user.username.trim() != "";
//   // const hasFirstname =
//   //   typeof user.firstname == "string" && user.firstname.trim() != "";
//   // const hasLastname =
//   //   typeof user.lastname == "string" && user.lastname.trim() != "";
//   // const hasEmail = typeof user.email == "string" && user.email.trim() != "";
//   // const hasPassword =
//   //   typeof user.password == "string" && user.password.trim() != "";

//   // return hasFirstname && hasLastname && hasEmail && hasPassword;
//   return hasUsername;
// }

// router.get("/users", (req, res) => {
//   queries.getAll().then(users => {
//     res.json(users);
//   });
// });

// router.get("/users/:id", isValidId, (req, res, next) => {
//   queries.getOne(req.params.id).then(user => {
//     if (user) {
//       res.json({ user });
//     } else {
//       res.status(404);
//       next();
//     }
//   });
// });

// router.get("/user/:id", (req, res) => {
//   knex
//     .select("description", "title", "username")
//     .from("articles")
//     .innerJoin("users", "articles.user_id", "users.id")
//     .where("articles.user_id", req.params.id)
//     .then(function(data) {
//       res.json(data);
//     });
// });

// router.post("/users", (req, res, next) => {
//   if (validUser(req.body)) {
//     queries.createOne(req.body).then(users => {
//       res.json(users[0]);
//     });
//   } else {
//     next(new Error("Invalid user"));
//   }
// });

// router.put("/users/:id", isValidId, (req, res, next) => {
//   if (validUser(req.body)) {
//     queries.updateOne(req.params.id, req.body).then(users => {
//       res.json(users[0]);
//     });
//   } else {
//     next(new Error("Invalid user"));
//   }
// });

// router.delete("/users/:id", isValidId, (req, res) => {
//   queries.deleteOne(req.params.id).then(() => {
//     res.json({
//       deleted: true
//     });
//   });
// });
// module.exports = router;
