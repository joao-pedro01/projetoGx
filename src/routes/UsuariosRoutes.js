import express from "express";
import UsuarioController from "../controllers/UsuariosController.js";

const router = express.Router();

router
    .get("/usuarios", UsuariosController.listarUsuarios);

export default router;