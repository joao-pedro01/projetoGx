import { listarEquipamentos } from '../models/Equipamentos.js';
import { dd } from './functions.js';

// class responsavel por todas acoes das pecas
class EquipamentosController {
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
};

export default EquipamentosController;