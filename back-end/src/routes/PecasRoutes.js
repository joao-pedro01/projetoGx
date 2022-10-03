import express from "express";
import PecasController from "../controllers/PecasController.js";

const router = express.Router();

// rotas para acoes usuarios
router
    .get("/api/pecas/:id", PecasController.listarPecas)
    .get("/api/peca/:id", PecasController.peca)
    .post("/api/peca", PecasController.cadastrarPeca)
    .put("/api/peca/:id", PecasController.desativarPeca)

export default router;