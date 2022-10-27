import express from "express";
/* import CategoriaController from "../controllers/CategoriaController.js"; */

const router = express.Router();

// rotas para acoes usuarios
router
    .get("/api/atributos/", AtributoController.listarCategorias)

export default router;