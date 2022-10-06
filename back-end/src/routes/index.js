import express from "express";
import usuarios from "./UsuariosRoutes.js";
import pecas from "./PecasRoutes.js";

const routes = (app) => {
    // rotas principais
    app.route('/').get((req, res) => {
        res.status(200).json({titulo: "Teste"});
    });
    app.route('/api/test').get((req,res) => {
        res.status(200).json({test: 1});
    });
    // rotas de arquivos externos
    app.use(
        express.json(),
        usuarios,
        pecas
    );
};

export default routes;