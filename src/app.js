import express from "express";
import routes from "./routes/index.js";
import db from "./config/dbConnect.js";

const app = express();
app.use(express.json());
routes(app);

export default app;