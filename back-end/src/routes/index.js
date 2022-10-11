import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "../../helpers/swagger.json" assert { type: "json" };
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
    app.use('/api/documentacao', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    // rotas de arquivos externos
    app.use((req, res, next) => {
        res.append('Access-Control-Allow-Origin', '*');
        res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        next();
    });
    app.use(
        express.json(),
        usuarios,
        pecas
    );
};

export default routes;