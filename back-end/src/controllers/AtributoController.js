import { cadastrarAtributo, desativarAtributo, listarAtributos } from '../models/Atributos.js';
import { dd, removeUndefined } from './functions.js';

// class responsavel por todas acoes das pecas
class AtributosController {
    /**
    * Lista todas categorias.
    *
    * @method GET
    * @param status (true, false, null)
    * @return (200) - objeto equipamentos
    * @return (500) - erro interno servidor
    * 
    * caso o query exista e esteja correto irá retornar um objeto query ["is_active"] => boolean().
    * caso o status seja true || false, vai fazer select com where, se for bem sucedido irá retornar status 200, caso contrário erro status 500
    * caso contrário irá executar select, mas sem query, as respostas são as mesmas, o que muda é o filtro do status.
    */
     static listarAtributos = (req, res) => {
        var query = {
            is_active: req.query.status,
            nome: req.query.nome,
        };
        removeUndefined(query);
        
        var status = query.is_active;
        status = status === 'true' ? '*' : status === 'false' ? false : true;
        
        if(status === true || status === false) {
            query.is_active = status;
            var select = listarAtributos(query);

            select.then((atributos) => {
                res.status(200).json(atributos);
            }).catch(err => {
                console.log(err);
                res.status(500).send({message: `falha ao listar atributo`});
            });
        }else {
            var select = listarAtributos();

            select.then((atributos) => {
                res.status(200).json(atributos);
            }).catch(err => {
                console.log(err);
                res.status(500).send({message: `falha ao listar atributos com query`});
            });
        };
    };

    /**
    * Cadastra atributo.
    *
    * @method POST
    * @param nome
    * @param numero
    * @return (200) - message
    * @return (405) - dados solicitados não recebido da forma correta
    * @return (422) - já existe no banco de dados e não pode repetir
    * @return (500) - erro interno servidor
    * 
    * caso não receber os dados solicitador irá retornar 405
    * caso contrário irá criar var para o select e executar, se o numero do atributo já se encontrar na base de dados irá retornar 422
    * caso contrário irá executar o insert e retornar 200, caso der erro irá retornar 500
    */
     static cadastrarAtributo = (req, res) => {
        var atributo = req.body;

        // tratamento caso nao recebe o que foi requisitado
        if(atributo.nome == undefined){
            res.status(405).send({message: 'input indefinido'});
        }else {
            let query = {
                nome : atributo.nome
            }
            var select = listarAtributos(query); 

            select.then((content) => {
                if(content.length !== 0) {
                    res.status(422).send({message: `nome: ${atributo.nome} já existe na base de dados`});
                } else {
                    // variavel responsavel por executar a query do insert
                    var insert = cadastrarAtributo(atributo);
        
                    insert.then(() => {
                        res.status(200).send({message:  `Atributo foi cadastrado com sucesso`});
                    }).catch(err => {
                        console.log(err);
                        res.status(500).send({message: `falha ao cadastrar atributo`});
                    });
                }
            });
        }
    }

    /**
    * Desativa atributo.
    *
    * @method DELETE
    * @param id
    * @return (200) - message
    * @return (404) - NOT FOUND / Valor solicitado não encotrado
    * @return (405) - Equipamento encontra-se desativada
    * @return (500) - erro interno servidor
    * 
    * irá fazer o select para verificar se o atributo informado via GET existe
    * caso não existir ira retornar 404 caso contrário irá verificar se o atributo já se encontra desativada caso o atributo estar inativo irá retornar 405
    * caso passar por todas etapas irá criar variavel de update enviando o valor caso ok retorna 200 caso contrário 500
    */
     static desativarAtributo = (req, res) => {
        var id = req.params.id;
        var select = atributo(id);

        select.then((atributo) => {
            // se a atributo nao existir vai entrar no if
            if(atributo.length == 0) {
                res.status(404).json("Atributo não existe!!!");
            }else if(atributo[0].is_active == false) {
                res.status(405).json("Atributo já esta desativada");
            }else {
                var update = desativarAtributo(id, false);
                // caso passar por todos os if ira desativar a equipamento
                update.then(() => {
                    desativarAtributo(id).then(() => {
                        res.status(200).json(`${atributo[0].nome} desativada com sucesso`);
                    }).catch(err => {
                        desativarAtributo(id, true);
                        console.log(err);
                        res.status(500).send({message: `falha ao desativar atributos`});
                    });
                }).catch(err => {
                    console.log(err);
                    res.status(500).send({message: `falha ao desativar atributo`});
                });
            }
        });
    }

}

export default AtributosController;