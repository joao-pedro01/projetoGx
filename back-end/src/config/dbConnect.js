import mysql from 'mysql2';
import * as dotenv from 'dotenv';
dotenv.config();

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'gx'
});

export default conn;