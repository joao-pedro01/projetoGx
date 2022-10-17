import { alterarQuantidade, cadastrarAtributo, cadastrarPeca, desativarAtributo, desativarPeca, listarPecas, peca, peca_atributos } from '../models/Pecas.js';
import { dd, removeUndefined } from './functions.js';

// class responsavel por todas acoes das pecas
class PecasController {
    /**
    * Lista equipamento e atributos detalhados
    *
    * @method GET
    * @params id
    * @return objeto {peca, atributos}(200)
    * @return Peca não existe(404)
    * @return erro interno servidor(500)
    */
    static peca = (req, res) => {
        var id = req.params.id;
        var select = peca(id);

        select.then((peca) => {
            // entra no if caso não retornar nada do db 
            if(peca.length === 0) {
                res.status(404).send({message: "Peça não encontrada"});
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
                });
            }
        });
    }

    /**
    * Lista todos equipamentos.
    *
    * @method GET
    * @query status (true, false, null)
    * @return objeto equipamentos(200)
    * @return erro interno servidor(500)
    * 
    * caso o query exista e esteja correto irá retornar um objeto query ["is_active"] => boolean().
    * caso o status seja true || false, vai fazer select com where, se for bem sucedido irá retornar status 200, caso der erro status 500
    * caso contrário irá executar select, mas sem query, as respostas são as mesmas, o que muda é o filtro do status.
    */
    static listarPecas = (req, res) => {
        var query = {
            is_active: req.query.status,
            nome: req.query.nome,
            sku: req.query.sku
        };
        removeUndefined(query);
        
        var status = query.is_active;

        if(status === 'true' || status === 'false' || status === undefined) {
            status = status === undefined ? true : status === 'true' ? true : false;

            query.is_active = status;
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
        }
    }

    /**
    * Lista todos equipamentos.
    *
    * @method POST
    * @query status (true, false, null)
    * @return objeto equipamentos(200)
    * @return erro interno servidor(500)
    * 
    * caso o query exista e esteja correto irá retornar um objeto query ["is_active"] => boolean().
    * caso o status seja true || false, vai fazer select com where, se for bem sucedido irá retornar status 200, caso der erro status 500
    * caso contrário irá executar select, mas sem query, as respostas são as mesmas, o que muda é o filtro do status.
    */
    static cadastrarPeca = (req, res) => {/* POST */
        let peca = req.body;

        // tratamento caso nao recebe o que foi requisitado
        if(peca.nome == undefined || peca.sku == undefined){
            res.status(405).send({message: 'input indefinido'});
        }else {
            let query = {
                sku: peca.sku
            }
            var select = listarPecas(query);

            select.then((content) => {
                if(content.length !== 0) {
                    res.status(422).send({Message: `SKU: ${peca.sku} já existe na base de dados`});
                } else {
                    // variavel responsavel por executar a query do insert
                    var insert = cadastrarPeca(peca);
        
                    insert.then(() => {
                        res.status(200).send({message:  `Peça foi cadastrada com sucesso`});
                    }).catch(err => {
                        console.log(err);
                        res.status(500).send({message: `falha ao cadastrar peça`});
                    });
                }
            });
        }
    }


    static cadastrarAtributo = (req, res) => {/* POST */
        const id = req.params.id, id_atributo = req.body.id_atributo;
        var valor = req.body.valor;
        let select = peca(id);

        select.then((peca) => {
            // entra no if caso não retornar nada do db 
            if(peca.length === 0) {
                res.status(404).send({message: "Peça não existe"});
            }else if(peca[0].is_active === false){
                res.status(405).send({message: "Peça esta desativada não é possivel inserir atributo"});
            }else {
                // variavel para consulta da peca solicitada (pelo id)
                let insert = cadastrarAtributo(id, id_atributo, valor);

                insert.then(() => {
                    res.status(200).send({message:  `Atributo foi cadastrado com sucesso`});
                }).catch(err => {
                    console.log(err);
                    res.status(500).send({message: `falha ao cadastrar atributo`});
                });
            }
        });
    }

    static alterarQuantidade = (req, res) => {/* PUT */
        var id = req.params.id;
        var select = peca(id);
        
        select.then((peca) => {
            var qnt = req.body.qnt;
            // se a peca nao existir vai entrar no if
            if(peca.length == 0) {
                res.status(404).send({message: "peça não encontrada"});
            }else if(peca[0].is_active == false) {
                res.status(405).send({message: "Peça esta desativada não pode alterar"});
            }else if(peca[0].qnt + qnt < 0) {
                res.status(400).send({message: 'Não é possivel pois não tem a quantidade em estoque'});
            }else {
                var qnt = peca[0].qnt + qnt;
                /*  variavel responsavel por executar alterarQuantidade, passando o id da peca e a quantidade a ser alterada, podendo ser positiva(somando) e negativa(subtraindo) com o valor do banco de dados */
                let update = alterarQuantidade(id, qnt);
                // da a resposta se foi sucess ou erro 
                update.then(() => {
                    res.status(200).json(`${peca[0].nome} foi alterado no estoque para: ${qnt}`);
                }).catch(err => {
                    console.log(err);
                    res.status(500).send({message: `falha ao atualizar a quantidade da peça`});
                });
            }
        });
    }

    static desativarPeca = (req, res) => {/* DELETE */
        var id = req.params.id;
        var select = peca(id);

        select.then((peca) => {
            // se a peca nao existir vai entrar no if
            if(peca.length == 0) {
                res.status(404).json("Peça não existe!!!");
            }else if(peca[0].is_active == false) {
                res.status(405).json("Peça já esta desativada");
            }else {
                var update = desativarPeca(id, false);
                // caso passar por todos os if ira desativar a peca
                update.then(() => {
                    desativarAtributo(id).then(() => {
                        res.status(200).json(`${peca[0].nome} desativada com sucesso`);
                    }).catch(err => {
                        desativarPeca(id, true);
                        console.log(err);
                        res.status(500).send({message: `falha ao desativar atributos`});
                    });
                }).catch(err => {
                    console.log(err);
                    res.status(500).send({message: `falha ao desativar peça`});
                });
            }
        });
    }
}

export default PecasController;