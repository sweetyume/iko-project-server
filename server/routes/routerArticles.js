const express = require("express");
const router = express.Router();
const moment = require("moment");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const client = require("../db/connection");

const {
  getArticle,
  getOneArticle,
  createArticle,
  editArticle,
  deleteArticle
} = require("../controllers/articles");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/articles", async (req, res) => {
  let queryResult = null;
  try {
    queryResult = await getArticle(client);
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
    return res
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
