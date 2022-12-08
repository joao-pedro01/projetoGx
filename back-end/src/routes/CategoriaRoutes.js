import express from "express";
import CategoriaController from "../controllers/CategoriaController.js";

const router = express.Router();

// rotas para acoes usuarios
router
    .get("/api/categorias/", CategoriaController.listarCategorias)
    .post("/api/categorias", CategoriaController.cadastrarCategoria)
    .put("/api/sistema/categorias/:id", CategoriaController.alterarQuantidadeCategoria)
    .delete("/api/categorias/:id", CategoriaController.desativarCategoria)

export default router;