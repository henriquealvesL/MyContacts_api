const { Client } = require("pg");
const { Query } = require("pg/lib/client");
require("dotenv").config();

const client = new Client({
  host: process.env.DB_HOST,
  port: 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

client.connect();

exports.query = async (query, values) => {
  const { rows } = await client.query(query, values);
  return rows;
};
