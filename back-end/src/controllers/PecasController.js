/* import pecas from "../models/Pecas.js"; */
import conn from "../config/dbConnect.js";
import var_dump from "var_dump";

// class responsavel por todas acoes das pecas
class PecasController {
    // function que retorna todas as pecas
    static listarPecas = (req, res) => {
        conn.select('*').table('pecas').where('is_active', true).then(pecas => {
            res.status(200).json(pecas);
        });
    };


    static cadastrarPeca = (req, res) => {
        let peca = req.body.name;

        console.log(peca);
        res.status(200).send({message: "deu certo"});
    };

    static desativarPeca = (req, res) => {
        var id = req.params.id;
        


        conn.select('nome', 'is_active').table('pecas').where('id', id).then(peca => {
            // se a peca nao existir vai entrar no if
            if(peca.length == 0) {
                res.status(404).json("Peça não existe!!!");
            }else if(peca[0].is_active == false) {
                res.status(405).json("Peça já esta desativada");
            }else {
                // caso passar por todos os if ira desativar a peca
                conn.where({id: id}).update({is_active: false}).table('pecas').then(data => {
                    res.status(200).json(`${peca[0].nome} desativada com sucesso`);
                });
            }
        });
    };

    static peca = (req, res) => {
        var id = req.params.id;
        conn.select('*').table('pecas').where('id', id).then(peca => {
            if(peca.length == 0) {
                res.status(404).json("Peça não encontrada!!!");
            }else {
                res.status(200).json(peca);
            }
        }).catch(err => {
            res.status.send({message: `${err} - falha ao exibir peça`});
        })
    };
};

export default PecasController;