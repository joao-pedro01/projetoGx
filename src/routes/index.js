import express from "express";
import usuarios from "./UsuariosRoutes.js";
const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({titulo: "Teste"});
    });
    app.route('/api/test').get((req,res) => {
        res.status(200).send({test: 1});
    });
    app.use(
        express.json(),
        usuarios
    );
};

export default routes;