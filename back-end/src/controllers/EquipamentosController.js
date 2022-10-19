import { cadastrarEquipamento, equipamento, equipamento_atributos, listarEquipamentos } from '../models/Equipamentos.js';
import { dd, removeUndefined } from './functions.js';

// class responsavel por todas acoes das pecas
class EquipamentosController {  
    /**
    * Lista todos equipamentos.
    *
    * @param status (true, false, null)
    * @return (200) - objeto equipamentos
    * @return (500) - erro interno servidor
    * 
    * caso o query exista e esteja correto irá retornar um objeto query ["is_active"] => boolean().
    * caso o status seja true || false, vai fazer select com where, se for bem sucedido irá retornar status 200, caso contrário erro status 500
    * caso contrário irá executar select, mas sem query, as respostas são as mesmas, o que muda é o filtro do status.
    */
    static listarEquipamentos = (req, res) => {
        var query = {
            is_active: req.query.status,
            nome: req.query.nome,
            patrimonio: req.query.patrimonio
        };
        removeUndefined(query);
        
        var status = query.is_active;

        if(status === 'true' || status === 'false' || status === undefined) {
            status = status === undefined ? true : status === 'true' ? true : false;

            query.is_active = status;
        };

        if(status === true || status === false) {
            var select = listarEquipamentos(query);

            select.then((equipamentos) => {
                res.status(200).json(equipamentos);
            }).catch(err => {
                console.log(err);
                res.status(500).send({message: `falha ao listar equipamentos peça`});
            });
        }else {
            var select = listarEquipamentos();

            select.then((equipamentos) => {
                res.status(200).json(equipamentos);
            }).catch(err => {
                console.log(err);
                res.status(500).send({message: `falha ao listar equipamentos com query`});
            });
        };
    };
    
    /**
    * Lista equipamento e atributos detalhados
    *
    * @param id
    * @return objeto {equipamento, atributos}(200)
    * @return Equipamento não existe(404)
    * @return erro interno servidor(500)
    */
    static equipamento = (req, res) => {
        const id = req.params.id;
        let select = equipamento(id);

        select.then((equipamento) => {
            if(equipamento.length === 0) {
                res.status(404).send({message: 'Equipamento não existe'});
            }else {
                select = equipamento_atributos(id);

                select.then((atributos) => {
                    if(atributos.length === 0) {
                        res.status(200).json(equipamento);
                    }else {
                        res.status(200).json({ equipamento, atributos });
                    }
                });
            }
        });
    }

    /**
    * Lista todos equipamentos.
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
    * caso contrário irá criar var para o select e executar, se o numero do equipamento já se encontrar na base de dados irá retornar 422
    * caso contrário irá executar o insert e retornar 200, caso der erro irá retornar 500
    */
    static cadastrarEquipamento = (req, res) => {
        let equipamento = req.body;

        // tratamento caso nao recebe o que foi requisitado
        if(equipamento.nome == undefined || equipamento.numero == undefined){
            res.status(405).send({message: 'input indefinido'});
        }else {
            let query = {
                numero: equipamento.numero
            }
            var select = listarEquipamentos(query);

            select.then((content) => {
                if(content.length !== 0) {
                    res.status(422).send({Message: `numero: ${equipamento.numero} já existe na base de dados`});
                } else {
                    // variavel responsavel por executar a query do insert
                    var insert = cadastrarEquipamento(equipamento);
                
        
                    insert.then(() => {
                        res.status(200).send({message:  `Equipamento foi cadastrado com sucesso`});
                    }).catch(err => {
                        console.log(err);
                        res.status(500).send({message: `falha ao cadastrar peça`});
                    });
                }
            });
        }
    }
}

export default EquipamentosController;