import express from "express";
const router = express.Router();

import queries from "../controller/usersQueries";

function isValidId(req, res, next) {
  if (!isNaN(req.params.id)) return next();
  next(new Error("Invalid ID"));
}
function validUser(user) {
  const hasFirstname =
    typeof user.user_firstname == "string" && user.user_firstname.trim() != "";
  const hasLastname =
    typeof user.user_lastname == "string" && user.user_lastname.trim() != "";
  const hasEmail =
    typeof user.user_email == "string" && user.user_email.trim() != "";
  const hasPassword =
    typeof user.user_password == "string" && user.user_password.trim() != "";

  return hasFirstname && hasLastname && hasEmail && hasPassword;
}

router.get("/users", (req, res) => {
  queries.getAll().then(users => {
    res.json(users);
  });
});

router.get("/:id", isValidId, (req, res, next) => {
  queries.getOne(req.params.id).then(user => {
    if (user) {
      res.json({ user });
    } else {
      res.status(404);
      next();
    }
  });
});

router.post("/", (req, res, next) => {
  if (validUser(req.body)) {
    queries.create(req.body).then(users => {
      res.json(users[0]);
    });
  } else {
    next(new Error("Invalid user"));
  }
});

router.put("/:id", isValidId, (req, res, next) => {
  if (validUser(req.body)) {
    queries.updateOne(req.params.id, req.body).then(users => {
      res.json(users[0]);
    });
  } else {
    next(new Error("Invalid user"));
  }
});

router.delete("/:id", isValidId, (req, res) => {
  queries.deleteOne(req.params.id).then(() => {
    res.json({
      deleted: true
    });
  });
});
module.exports = router;
