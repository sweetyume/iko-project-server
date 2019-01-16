const { Router } = require("express");
const router = new Router();
const api = require("../index");

router.post("/register", api.auth.register);
router.post("/login", api.auth.login);

module.exports = router;
