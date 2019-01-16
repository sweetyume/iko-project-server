const express = require("express");
const router = express.Router();

const queries = require("../controller/articlesQueries");

function isValidId(req, res, next) {
  if (!isNaN(req.params.id)) return next();
  next(new Error("Invalid ID"));
}

router.get("/articles", (req, res) => {
  queries.getAllArticles().then(articles => {
    res.json(articles);
  });
});

router.get("/articles/:id", isValidId, (req, res, next) => {
  queries.getArticle(req.params.id).then(article => {
    if (article) {
      res.json({ article });
    } else {
      res.status(404);
      next();
    }
  });
});

router.post("/articles", (req, res) => {
  queries.createArticle(req.body).then(articles => {
    res.json(articles);
  });
});

router.put("/articles/:id", isValidId, (req, res, next) => {
  queries.updateArticle(req.params.id, req.body).then(articles => {
    if (articles) {
      res.json(articles[0]);
    } else {
      next(new Error("Invalid article"));
    }
  });
});

router.delete("/articles/:id", isValidId, (req, res) => {
  queries.deleteArticle(req.params.id).then(() => {
    res.json({
      deleted: true
    });
  });
});

module.exports = router;
