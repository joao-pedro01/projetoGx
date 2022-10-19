import { alterarQuantidade, cadastrarAtributo, cadastrarPeca, desativarAtributo, desativarPeca, listarPecas, peca, peca_atributos } from '../models/Pecas.js';
import { dd, removeUndefined } from './functions.js';

// class responsavel por todas acoes das pecas
class PecasController {
    /**
    * Lista equipamento e atributos detalhados
    *
    * @method GET
    * @param id
    * @return (200) - json {peca, atributos}
    * @return (404) - Peca não existe
    * @return (500) - erro interno servidor
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
    * @return (200) - json{equipamentos}
    * @return (500) - erro interno servidor
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
    * @param nome
    * @param sku
    * @return (200) - message
    * @return (405) - dados solicitados não recebido da forma correta
    * @return (422) - já existe no banco de dados e não pode repetir
    * @return (500) - erro interno servidor
    * 
    * caso não receber os dados solicitador irá retornar 405
    * caso contrário irá criar var para o select e executar, se o numero do equipamento já se encontrar na base de dados irá retornar 422
    * caso contrário irá executar o insert e retornar 200, caso der erro irá retornar 500
    */
    static cadastrarPeca = (req, res) => {
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


    /**
    * Lista todos equipamentos.
    *
    * @method POST
    * @param id
    * @param id_atributo
    * @param valor
    * @return (200) - json objeto equipamentos
    * @return (404) - NOT FOUND / Valor solicitado não encotrado
    * @return (500) - erro interno servidor
    * 
    * irá fazer o select para verificar se a peça informada via GET existe
    * caso não existir ira retornar 404 caso contrário irá verificar se a peça está ativa
    * caso passar por todas etapas irá criar variavel de insert caso ok retorna 200 caso contrário 500
    */
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

    /**
    * Lista todos equipamentos.
    *
    * @method PUT
    * @param id
    * @param qnt
    * @return (200) - json objeto equipamentos
    * @return (400) - O dado enviado é inválido
    * @return (404) - NOT FOUND / Valor solicitado não encotrado
    * @return (405) - Peça encontra-se desativada e não é possivel alterar
    * @return (500) - erro interno servidor
    * 
    * irá fazer o select para verificar se a peça informada via GET existe
    * caso não existir ira retornar 404 caso contrário irá verificar se a peça está ativa caso a peça estar inativa irá retornar 405
    * caso passar por todas etapas irá criar variavel de update enviando o valor caso ok retorna 200 caso contrário 500
    */
    static alterarQuantidade = (req, res) => {
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

    /**
    * Lista todos equipamentos.
    *
    * @method DELETE
    * @param id
    * @return (200) - message
    * @return (404) - NOT FOUND / Valor solicitado não encotrado
    * @return (405) - Peça encontra-se desativada
    * @return (500) - erro interno servidor
    * 
    * irá fazer o select para verificar se a peça informada via GET existe
    * caso não existir ira retornar 404 caso contrário irá verificar se a peça já se encontra desativada caso a peça estar inativa irá retornar 405
    * caso passar por todas etapas irá criar variavel de update enviando o valor caso ok retorna 200 caso contrário 500
    */
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