const { Router } = require("express");

const users = require("./routerUsers");
const articles = require("./routerArticles");
const comments = require("./routerComments");
const session = require("./routerSession");

const router = Router();

router.use("/", users);
router.use("/", articles);
router.use("/", comments);
router.use(session);

module.exports = router;
