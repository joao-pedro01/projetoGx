import express from "express";
import EquipamentosController from "../controllers/EquipamentosController.js";

const router = express.Router();

// rotas para acoes usuarios
router
    .get("/api/equipamentos/", EquipamentosController.listarEquipamentos)
    .get("/api/equipamentos/:id", EquipamentosController.equipamento)
    .post("/api/equipamentos", EquipamentosController.cadastrarEquipamento)
    .delete("/api/equipamentos/:id", EquipamentosController.desativarEquipamento)

export default router;