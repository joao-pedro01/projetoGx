import { alterarQuantidade, cadastrarPeca, desativarPeca, listarPecas, peca, peca_atributos } from '../models/Pecas.js';
import var_dump from "var_dump";
import { dd, setheader } from './functions.js';

// class responsavel por todas acoes das pecas
class PecasController {
    // function que retorna todas as pecas
    static peca = (req, res) => {
        var id = req.params.id;
        var select = peca(id);

        select.then((peca) => {
            if(peca.length === 0) {
                res.status(404).json("Peça não encontrada!!!");
            }else {
                var innerJoin = peca_atributos(id);
                
                innerJoin.then((atributos) => {
                    if(atributos.length === 0) {
                        res.status(200).json(peca);
                        console.log("Não tem atributos");
                    }else {
                        var result = { peca, atributos }
                        res.status(200).json(result);
                    }
                }).catch(err => {
                    console.log(err);
                    res.status(500).send({message: `falha ao exibir peça`});
                })
            };
        });
    };

    static listarPecas = (req, res) => {
        var status = req.query.status, query;

        if(status === 'true' || status === 'false' || status === undefined) {
            status = status === undefined ? null : status === 'true' ? true : false;

            var query = {
                is_active: status
            };
        };

        if(status === true || status === false) {
            var select = listarPecas(query);

            select.then((pecas) => {
                res.status(200).json(pecas);
            }).catch(err => {
                console.log(err);
                res.status(500).send({message: `falha ao listar peças peça`});
            });
        }else {
            var select = listarPecas();

            select.then((pecas) => {
                /* var test = setheader();
                dd(test); */

                res.status(200).json(pecas);
            }).catch(err => {
                console.log(err);
                res.status(500).send({message: `falha ao listar peças com query`});
            });
        };
    };

    static cadastrarPeca = (req, res) => {
        let peca = req.body;
        
        
        if(peca.nome == undefined || peca.sku == undefined){
            res.status(422).send({message: 'input indefinido'});
        }else {
            var insert = cadastrarPeca(peca);

            insert.then(() => {
                res.status(200).send({message:  `Peça foi cadastrada`});
            }).catch(err => {
                console.log(err);
                res.status(500).send({message: `falha ao cadastrar peça`});
            });
        };
    };


    static alterarQuantidade = (req, res) => {        
        var id = req.params.id;
        var qnt = req.body.qnt;
        var test = {
            qnt: qnt
        }
        var update = alterarQuantidade(id, test);

        update.then(() => {
            
        }).catch(err => {
            console.log(err);
            res.status(500).send({message: `falha ao desativar peça`});
        });;

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
                }).catch(err => {
                    console.log(err);
                    res.status(500).send({message: `falha ao desativar peça`});
                });
            };
        });
    };
};

export default PecasController;