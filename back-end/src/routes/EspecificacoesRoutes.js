import express from "express";
import EspecificacoesController from "../controllers/EspecificacoesController.js";

const router = express.Router();

router
    .get("/api/especificacoes/", EspecificacoesController.listarEspecificacoes)

export default router;