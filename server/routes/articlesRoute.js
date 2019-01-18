const express = require("express");
const router = express.Router();
const moment = require("moment");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const client = require("../db/connection");

const {
  getArticles,
  getOneArticle,
  createArticle,
  editArticle,
  deleteArticle
} = require("../controllers/articles");

// const uploadPath = path.join(__dirname, "../uploads");
const storage = multer.memoryStorage();
const upload = multer({ storage });
// const storage = multer.diskStorage({
//   destination: (request, file, cb) => {
//     cb(null, uploadPath);
//   },
//   filename: (request, file, cb) => {
//     cb(null, file.originalname);
//   },
//   limits: { fieldNameSize: 500 }
// });

router.get("/articles", async (req, res) => {
  let queryResult = null;
  try {
    queryResult = await getArticles(client);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new Error("Erreur dans l'acquisition des articles", error));
  }
  return res.status(200).send(queryResult.rows);
});

router.get("/articles/:id", async (req, res) => {
  let article = null;
  try {
    article = await getOneArticle(req.params.id);
    const writePath = path.join(
      __dirname,
      "../uploads/",
      article.image_file_path
    );
    const file = await fs.promises.readFile(writePath);
    article.file = file;
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send(new Error("Erreur dans l'acquisition d'un article'", error));
  }
  return res.status(200).send(article);
});

router.post("/articles", upload.single("image"), async (req, res) => {
  let insertArticleResult = null;
  const writePath = path.join(__dirname, "../uploads/", req.file.originalname);
  try {
    await fs.promises.writeFile(writePath, req.file.buffer);
    insertArticleResult = await createArticle({
      user_id: req.body.user_id,
      country: req.body.country,
      title: req.body.title,
      description: req.body.description,
      imageFilePath: req.file.originalname,
      created_at: moment()
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new Error("Erreur dans l'insertion d'un article", error));
  }
  return res.status(200).send(insertArticleResult.rows);
});

router.put("/articles/edit/:id", async (req, res) => {
  let editArticleResult = null;
  try {
    // assign
    editArticleResult = await editArticle(req.params.id, {
      country: req.body.country,
      title: req.body.title,
      description: req.body.description
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new Error("Erreur dans l'édition d'un article", error));
  }
  return res.status(200).send(editArticleResult.rows);
});

router.delete("/articles/delete/:id", async (req, res) => {
  let deleteArticleResult = null;
  try {
    deleteArticleResult = await deleteArticle(req.params.id);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new Error("Erreur dans la suppression d'un article", error));
  }
  return res.status(200).send(deleteArticleResult);
});

module.exports = router;

// const queries = require("../controller/articlesQueries");

// function isValidId(req, res, next) {
//   if (!isNaN(req.params.id)) return next();
//   next(new Error("Invalid ID"));
// }

// router.get("/articles", (req, res) => {
//   queries.getAllArticles().then(articles => {
//     res.json(articles);
//   });
// });

// router.get("/articles/:id", isValidId, (req, res, next) => {
//   queries.getArticle(req.params.id).then(article => {
//     if (article) {
//       res.json({ article });
//     } else {
//       res.status(404);
//       next();
//     }
//   });
// });

// router.post("/articles", (req, res) => {
//   queries.createArticle(req.body).then(articles => {
//     res.json(articles);
//   });
// });

// router.put("/articles/:id", isValidId, (req, res, next) => {
//   queries.updateArticle(req.params.id, req.body).then(articles => {
//     if (articles) {
//       res.json(articles[0]);
//     } else {
//       next(new Error("Invalid article"));
//     }
//   });
// });

// router.delete("/articles/:id", isValidId, (req, res) => {
//   queries.deleteArticle(req.params.id).then(() => {
//     res.json({
//       deleted: true
//     });
//   });
// });
