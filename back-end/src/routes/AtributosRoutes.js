import express from "express";
import AtributosController from "../controllers/AtributoController.js"; 

const router = express.Router();

// rotas para acoes usuarios
router
    .get("/api/atributos/", AtributosController.listarAtributos)
    .post("/api/atributos/", AtributosController.cadastrarAtributo)
    .put("/api/atributos/", AtributosController.alterarAtributo)
    .delete("/api/atributos/", AtributosController.desativarAtributo)

export default router;