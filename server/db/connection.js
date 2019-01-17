// const config = require("../knexfile");
// const knex = require("knex");
// const environment = process.env.NODE_ENV || "development";
// const environmentConfig = config[environment];

// const connection = knex(environmentConfig);

// module.exports = connection;
const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  port: 5432,
  database: "iko-test",
  user: "postgres",
  password: ""
});

(async () => {
  await client.connect();
})();

module.exports = client;
