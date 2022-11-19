import knex from 'knex';
import * as dotenv from 'dotenv';
dotenv.config();

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