import express from "express";
import routes from "./routes/index.js";
import db from "./config/dbConnect.js";

db.connect((err) => {
  if(err) return console.log(err);
  console.log('conectou com DB!');
});

const app = express();
app.use(express.json());
routes(app);

export default app;