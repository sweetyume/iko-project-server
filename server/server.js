const express = require("express");
const cors = require("cors");
const config = require("./config/config");
const usersRoutes = require("./routes/usersRoute");
const authRoutes = require("./routes/authRoute");
const articlesRoutes = require("./routes/articlesRoute");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors());

server.use("/", authRoutes);
server.use("/", usersRoutes);
server.use("/", articlesRoutes);

server.listen(config.config, () => {
  console.log(`Started on port ${config.config}`);
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
