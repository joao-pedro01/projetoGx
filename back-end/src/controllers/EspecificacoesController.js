import {
    // cadastrarCategoria,
    // desativarCategoria,
    listarCategorias, listarCategoriasEspecificacoes, listarEspecificacoes
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
    static listarEspecificacoes = (req, res) => {
        var select = listarEspecificacoes();

        select.then((categorias) => {
            res.status(200).json(categorias);
        }).catch(err => {
            console.log(err);
            res.status(500).send({message: `falha ao listar categorias com query`});
        });
    }

    static listarCategorias = (req, res) => {
        var select = listarCategoriasEspecificacoes();
        select.then((especificacoes) => {
            //var especificacoes = listarEspecificacoes();
                res.status(200).json({especificacoes});
        }).catch(err => {
            console.log(err)
            res.status(500);
        })
    }
}

export default CategoriasController;