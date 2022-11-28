import express from "express";
import UsuarioController from "../controllers/UsuarioController.js";

const router = express.Router();

// rotas para acoes usuarios
router
    .post("/api/logout", UsuarioController.logout)
    .get("/api/usuarios", UsuarioController.listarUsuarios)
    .post("/api/cadastro", UsuarioController.cadastrarUsuario)
    .post("/api/entrar", UsuarioController.loginUsuario)
    .post("/api/entrar/test", UsuarioController.test)
export default router;