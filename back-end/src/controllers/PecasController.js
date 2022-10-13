import { alterarQuantidade, cadastrarPeca, desativarPeca, listarPecas, peca, peca_atributos } from '../models/Pecas.js';
import { dd } from './functions.js';

// class responsavel por todas acoes das pecas
class PecasController {
    // ira retornar a peca solicitada pelo
    /* GET */static peca = (req, res) => {
        var id = req.params.id;
        var select = peca(id);

        select.then((peca) => {
            // entra no if caso não retornar nada do db 
            if(peca.length === 0) {
                res.status(404).json("Peça não encontrada!!!");
            }else {
                // variavel para consulta da peca solicitada (pelo id) 
                var innerJoin = peca_atributos(id);
                
                innerJoin.then((atributos) => {
                    // ira entrar no if caso não houver atributos relacionado a peca e retornar somente a peca
                    if(atributos.length === 0) {
                        res.status(200).json(peca);
                        console.log("Não tem atributos");
                    }else {
                        // ira retornar as peças com os atributos
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
    // responsavel por listar todas as pecas
    /* GET */static listarPecas = (req, res) => {
        var status = req.query.status, query;

        // caso exista query via url ira entrar para tratar o retorno para executar a busca no bd
        if(status === 'true' || status === 'false' || status === undefined) {
            status = status === undefined ? true : status === 'true' ? true : false;

            // objeto que vai guardar os dados para a busca
            var query = {
                is_active: status
            };
        };

        // if para entrar caso buscar pecas ativas e inativas
        if(status === true || status === false) {
            var select = listarPecas(query);

            // select para executar busca com query
            select.then((pecas) => {
                res.status(200).json(pecas);
            }).catch(err => {
                console.log(err);
                res.status(500).send({message: `falha ao listar peças peça`});
            });
        }else {
            var select = listarPecas();

            // select que faz a busca sem query
            select.then((pecas) => {
                res.status(200).json(pecas);
            }).catch(err => {
                console.log(err);
                res.status(500).send({message: `falha ao listar peças com query`});
            });
        };
    };

    // responsavel por cadastrar peca
    /* POST */static cadastrarPeca = (req, res) => {
        let peca = req.body;

        // tratamento caso nao recebe o que foi requisitado
        if(peca.nome == undefined || peca.sku == undefined){
            res.status(405).send({message: 'input indefinido'});
        }else {
            let query = {
                sku: peca.sku
            }
            var select = listarPecas(query)

            select.then((content) => {
                if(content.length !== 0) {
                    res.status(404).send({Message: `SKU: ${peca.sku} já existe na base de dados`});
                } else {
                    // variavel responsavel por executar a query do insert
                    var insert = cadastrarPeca(peca);
        
                    insert.then(() => {
                        res.status(200).send({message:  `Peça foi cadastra  da com sucesso`});
                    }).catch(err => {
                        console.log(err);
                        res.status(500).send({message: `falha ao cadastrar peça`});
                    });
                }
            })
        };
    };


    /* PUT */static alterarQuantidade = (req, res) => {        
        var id = req.params.id;
        var select = peca(id);
        
        select.then((peca) => {
            var qnt = req.body.qnt;
            // se a peca nao existir vai entrar no if
            if(peca.length == 0) {
                res.status(404).send({message: "peça não encontrada"});
            }else if(peca[0].is_active == false) {
                res.status(405).json("Peça esta desativada não pode alterar");
            }else if(peca[0].qnt + qnt < 0) {
                res.status(400).send({message: 'Não é possivel pois não tem a quantidade em estoque'});
            }else {
                var qnt = peca[0].qnt + qnt;
                var update = alterarQuantidade(id, qnt);
                update.then(() => {
                    res.status(200).json(`${peca[0].nome} foi alterado no estoque para: ${qnt}`);
                }).catch(err => {
                    console.log(err);
                    res.status(500).send({message: `falha ao atualizar a quantidade da peça`});
                });
            };
        });
    };

    /* DELETE */static desativarPeca = (req, res) => {
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