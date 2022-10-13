import { equipamento, listarEquipamentos } from '../models/Equipamentos.js';
import { dd } from './functions.js';

// class responsavel por todas acoes das pecas
class EquipamentosController {
    // function que retorna todas as pecas
    static equipamento = (req, res) => {
        var id = req.params.id;
        var select = equipamento(id);

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

    static listarEquipamentos = (req, res) => {
        var status = req.query.status, query;

        if(status === 'true' || status === 'false' || status === undefined) {
            status = status === undefined ? true : status === 'true' ? true : false;

            var query = {
                is_active: status
            };
        };

        if(status === true || status === false) {
            var select = listarEquipamentos(query);

            select.then((equipamentos) => {
                res.status(200).json(equipamentos);
            }).catch(err => {
                console.log(err);
                res.status(500).send({message: `falha ao listar peças peça`});
            });
        }else {
            var select = listarEquipamentos();

            select.then((equipamentos) => {
                res.status(200).json(equipamentos);
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
                res.status(200).send({message:  `Peça foi cadastrada com sucesso`});
            }).catch(err => {
                console.log(err);
                res.status(500).send({message: `falha ao cadastrar peça`});
            });
        };
    };


    static alterarQuantidade = (req, res) => {        
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

export default EquipamentosController;