import knex from 'knex';
import dotenv from "dotenv-safe";
dotenv.config({allowEmptyValues: true});

var conn = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'gx',
    port: process.env.DB_PORT
  }
});
export default conn;