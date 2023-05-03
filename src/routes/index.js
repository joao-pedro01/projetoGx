import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "../../helpers/swagger.json" assert { type: "json" };
import usuarios from "./UsuariosRoutes.js";
import categoria from "./CategoriaRoutes.js";
import especificacao from "./EspecificacoesRoutes.js";
import { dd, verifyJWT } from "../controllers/functions.js";

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
        res.append('Access-Control-Allow-Headers', '*');
        res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        next();
    });
    app.use(
        express.json(),
        usuarios,
        /* verifyJWT, */
        categoria,
        especificacao
    );
};
var cep = "https://viacep.com.br/ws/"+cep+"/json/"
export default routes;