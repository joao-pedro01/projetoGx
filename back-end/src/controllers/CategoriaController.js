import {
    listarCategorias
} from '../models/Categoria.js';
import { dd, removeUndefined } from './functions.js';

// class responsavel por todas acoes das pecas
class CategoriasController {
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
     static listarCategorias = (req, res) => {
        var query = {
            is_active: req.query.status,
            nome: req.query.nome,
            tipo: req.query.tipo,
        };
        removeUndefined(query);
        
        var status = query.is_active;
        status = status === 'true' ? '*' : status === 'false' ? false : true;

        if(status === true || status === false) {
            query.is_active = status;
        }

        if(status === true || status === false) {
            var select = listarCategorias(query);

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
}

export default CategoriasController;