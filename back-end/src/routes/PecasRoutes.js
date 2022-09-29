import express from "express";
import PecasController from "../controllers/PecasController.js";

const router = express.Router();

// rotas para acoes usuarios
router
    .get("/api/pecas", PecasController.listarPecas)
    .get("/api/peca/:id", PecasController.peca)
    .delete("/api/peca/:id", PecasController.deletarPeca)

export default router;