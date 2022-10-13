import express from "express";
import EquipamentosController from "../controllers/EquipamentosController.js";

const router = express.Router();

// rotas para acoes usuarios
router
    .get("/api/equipamentos/", EquipamentosController.listarEquipamentos)
    // .get("/api/equipamentos/:id", EquipamentosController.peca)
    // .post("/api/equipamentos", EquipamentosController.cadastrarPeca)
    // .put("/api/equipamentos/:id", EquipamentosController.alterarQuantidade)
    // .delete("/api/equipamentos/:id", EquipamentosController.desativarPeca)

export default router;