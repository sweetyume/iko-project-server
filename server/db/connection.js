import config from "../knexfile";
import knex from "knex";
const environment = process.env.NODE_ENV || "development";
const environmentConfig = config[environment];

const connection = knex(environmentConfig);

module.exports = connection;
