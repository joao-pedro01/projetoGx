import express from "express";
import UsuarioController from "../controllers/UsuarioController.js";

const router = express.Router();

// rotas para acoes usuarios
router
    .get("/api/usuarios", UsuarioController.listarUsuarios);

export default router;