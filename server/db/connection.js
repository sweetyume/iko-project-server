const config = require("../knexfile");
const knex = require("knex");
const environment = process.env.NODE_ENV || "development";
const environmentConfig = config[environment];

const connection = knex(environmentConfig);

module.exports = connection;
