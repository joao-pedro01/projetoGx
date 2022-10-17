import express from "express";
import PecasController from "../controllers/PecasController.js";

const router = express.Router();

// rotas para acoes usuarios
router
    .get("/api/pecas/", PecasController.listarPecas)
    .get("/api/pecas/:id", PecasController.peca)
    .post("/api/pecas", PecasController.cadastrarPeca)
    .post("/api/pecas/:id", PecasController.cadastrarAtributo)
    .put("/api/pecas/:id", PecasController.alterarQuantidade)
    .delete("/api/pecas/:id", PecasController.desativarPeca)

export default router;