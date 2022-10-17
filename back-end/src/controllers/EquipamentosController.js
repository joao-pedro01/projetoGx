import { equipamento, equipamento_atributos, listarEquipamentos } from '../models/Equipamentos.js';
import { dd, removeUndefined } from './functions.js';

// class responsavel por todas acoes das pecas
class EquipamentosController {  
    /**
    * Lista todos equipamentos.
    *
    * @query status (true, false, null)
    * @return objeto equipamentos(200)
    * @return erro interno servidor(500)
    * 
    * caso o query exista e esteja correto irá retornar um objeto query ["is_active"] => boolean().
    * caso o status seja true || false, vai fazer select com where, se for bem sucedido irá retornar status 200, caso der erro status 500
    * caso contrário irá executar select, mas sem query, as respostas são as mesmas, o que muda é o filtro do status.
    */
    static listarEquipamentos = (req, res) => {
        var query = {
            is_active: req.query.status,
            nome: req.query.nome,
            patrimonio: req.query.sku
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
    * @params id
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
}

export default EquipamentosController;