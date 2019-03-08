const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const config = require("./config/config");
const router = require("./routes/routerIndex");
const { validateToken } = require("./Authentication");
const getUserToken = require("./controllers/getUserToken");

const server = express();

server.use(cookieParser());
server.use(express.json({ limit: "50mb" }));
server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(cors());
// server.use(validateToken);
server.use(router);

server.get("/auth", async (req, res) => {
  let user = null;
  try {
    user = await getUserToken(req.cookies.token);
  } catch (error) {
    console.log("Erreur authentication: " + error);
    return res.status(401).send({
      authenticated: false,
      user: null
    });
  }

  res.status(200).json({
    authenticated: true,
    user
  });
});

server.listen(config.port, () => {
  console.log(`Started on port ${config.port}`);
});

// catch 404 and forward to error handler
server.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
server.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.server.get("env") === "development" ? err : {}
  });
});

module.exports = server;
