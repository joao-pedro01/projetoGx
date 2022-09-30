import express from "express";
import routes from "./routes/index.js";
import conn from "./config/dbConnect.js";

conn;

const app = express();
app.use(express.json());
routes(app);

export default app;