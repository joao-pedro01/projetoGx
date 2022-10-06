import { cadastrarPeca, desativarPeca, listarPecas, peca, peca_atributos } from '../models/Pecas.js';
import var_dump from "var_dump";
import { dd } from './functions.js';

// class responsavel por todas acoes das pecas
class PecasController {
    // function que retorna todas as pecas
    static listarPecas = (req, res) => {
        var status = req.query.status, is_active = null;

        switch (status) {
            case 'ativo':
                    is_active = true;
                break;
            
            case 'inativa':
                    is_active = false;
                break;
        }

        var query = {
            is_active: is_active
        };

        if(is_active !== null) {
            var select = listarPecas(query);

            select.then((pecas) => {
                res.status(200).json(pecas);
            });
        }else {
            var select = listarPecas();

            select.then((pecas) => {
                res.setHeader('Access-Control-Allow-Origin', '*')
                .status(200).json(pecas);
            });
        }
    };

    static cadastrarPeca = (req, res) => {
        let peca = req.body;
        var insert = cadastrarPeca(peca);

        insert.then(peca => {
            res.status(200).send({message:  `Peça foi cadastrada`});
        });
    };

    static desativarPeca = (req, res) => {
        var id = req.params.id;
        var select = peca(id);

        select.then((peca) => {
            // se a peca nao existir vai entrar no if
            if(peca.length == 0) {
                res.status(404).json("Peça não existe!!!");
            }else if(peca[0].is_active == false) {
                res.status(405).json("Peça já esta desativada");
            }else {
                var update = desativarPeca(id);
                // caso passar por todos os if ira desativar a peca
                update.then(() => {
                    res.status(200).json(`${peca[0].nome} desativada com sucesso`);
                });
            }
        });
    };

    static peca = (req, res) => {
        var id = req.params.id;
        var select = peca(id);

        select.then((peca) => {
            if(peca.length === 0) {
                res.status(404).json("Peça não encontrada!!!");
            }else {
                var innerJoin = peca_atributos(id);
                
                innerJoin.then((atributos) => {
                    var result = { peca, atributos }
                    res.status(200).json(result);
                }).catch(err => {
                    console.log(err);
                    res.status(500).send({message: `falha ao exibir peça`});
                })
            }
        });
    };
};

export default PecasController;