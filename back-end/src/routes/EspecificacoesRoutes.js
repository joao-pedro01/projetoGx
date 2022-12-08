import express from "express";
import EspecificacoesController from "../controllers/EspecificacoesController.js";

const router = express.Router();

router
    .get("/api/especificacoes/", EspecificacoesController.listarEspecificacoes)
    .put("/api/especificacoes/:id", EspecificacoesController.alterarQuantidade)
    .delete("/api/especificacoes/:id", EspecificacoesController.desativarEspecificacoes)

export default router;