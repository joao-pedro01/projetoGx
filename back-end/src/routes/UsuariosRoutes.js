import express from "express";
import UsuarioController from "../controllers/UsuarioController.js";

const router = express.Router();

// rotas para acoes usuarios
router
    .get("/api/usuarios", UsuarioController.listarUsuarios)
    .post("/api/cadastro", UsuarioController.cadastrarUsuario)

export default router;