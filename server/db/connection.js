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
