/* import pecas from "../models/Pecas.js"; */
import conn from "../config/dbConnect.js"
import knex from "knex";

// class responsavel por todas acoes das pecas
class PecasController {
    // function que retorna todas as pecas
    static listarPecas = (req, res) => {
        conn.select('*').table('pecas').then(pecas => {
            console.log(pecas);
            res.status(200).json(pecas);
        });
    };
    static deletarPeca = (req, res) => {
        var id = req.params.id;
        
        conn.where({id: id}).update({is_active: true}).table("pecas").then(data => {
            console.log(data);
        })
    };
    static peca = (req, res) => {
        var id = req.params.id;
        conn.select('*').table('pecas').where('id', id).then(peca => {
            if(peca.length == 0) {
                res.status(404).json("Peça não encontrada!!!");
            }else {
                res.status(200).json(peca);
            }
        });
    };
};

export default PecasController;