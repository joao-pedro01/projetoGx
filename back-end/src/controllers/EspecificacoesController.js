
import {
    desativarEspecificacao,
    especificacao,
    listarEspecificacoes
} from '../models/Especificacoes.js';
import { dd, removeNull, removeUndefined } from './functions.js';

// class responsavel por todas acoes das pecas
class EspecificacoesController {
    /**
    * 
    *
    * @method GET
    * @param 
    * @return 
    * 
    * 
    */
    static listarEspecificacoes = (req, res) => {
        var query = req.query;
        removeUndefined(req.query);
        var status = query.is_active;
        status = status === 'true' ? '*' : status === 'false' ? false : true;
        
        if(query) {
            query.is_active = status;
            var select = listarEspecificacoes(query);

            select.then((categorias) => {
                removeNull(categorias);
                res.status(200).json(categorias);
            }).catch(err => {
                console.log(err);
                res.status(500).send({message: `falha ao listar categorias`});
            })
        }else {
            var select = listarCategorias();

            select.then((categorias) => {
                res.status(200).json(categorias);
            }).catch(err => {
                console.log(err);
                res.status(500).send({message: `falha ao listar categorias com query`});
            })
        }
    }

    /**
    * Desativar categoria.
    *
    * @method DELETE
    * @param id
    * @return (200) - message
    * @return (404) - NOT FOUND / Valor solicitado não encotrado
    * @return (405) - message
    * @return (500) - erro interno servidor
    * 
    * irá fazer o select para verificar se a especificacao informado via GET existe
    * caso não existir ira retornar 404 caso contrário irá verificar se a especificacao já se encontra desativado caso a especificacao estar inativo irá retornar 405
    * caso passar por todas etapas irá criar variavel de update enviando o valor caso ok retorna 200 caso contrário 500
    */
    static desativarEspecificacoes = (req, res) => {
        var id = req.params.id;
        var select = especificacao(id);

        select.then((especificacao) => {
            // se a especificacao nao existir vai entrar no if
            if(especificacao.length == 0) {
                res.status(404).json("Especificacao não existe");
            }else if(especificacao[0].is_active == false) {
                res.status(405).json("Especificacao já esta desativada");
            }else {
                var update = desativarEspecificacao(id, false);
                // caso passar por todos os if ira desativar a especificacao
                update.then(() => {
                    res.status(200).json(`${especificacao[0].marca} desativado(a) com sucesso`);
                }).catch(err => {
                    console.log(err);
                    res.status(500).send({message: `falha ao desativar especificacao`});
                });
            }
        });
    }
}

export default EspecificacoesController;