import express from "express";
import EspecificacoesController from "../controllers/EspecificacoesController.js";

const router = express.Router();

// rotas para acoes usuarios
router
    .get("/api/especificacoes/", EspecificacoesController.listarEspecificacoes)
    // .get("/api/equipamentos/:id", EspecificacoesController.equipamento)
    // .post("/api/equipamentos", EspecificacoesController.cadastrarEquipamento)
    // .delete("/api/equipamentos/:id", EspecificacoesController.desativarEquipamento)

export default router;