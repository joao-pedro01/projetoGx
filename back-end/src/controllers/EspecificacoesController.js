
import {
    alterarQuantidade,
    desativarEspecificacao,
    especificacao,
    listarEspecificacoes
} from '../models/Especificacoes.js';
import { dd, removeNull, removeUndefined } from './functions.js';

// class responsavel por todas acoes das especificacaos
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
    * Lista equipamento e atributos detalhados
    *
    * @method GET
    * @param id
    * @return (200) - json {especificacao, atributos}
    * @return (404) - Peca não existe
    * @return (500) - erro interno servidor
    */
     static especificacao = (req, res) => {
        var id = req.params.id;
        var select = especificacao(id);

        select.then((especificacao) => {
            // entra no if caso não retornar nada do db 
            if(especificacao.length === 0) {
                res.status(404).send({message: "Peça não encontrada"});
            }

            res.status(200).json(especificacao);
        }).catch(err => {
            console.log(err);
            res.status(500).send({message: `falha ao exibir peça`});
        });
    };

    /**
        * Altera a quantidade da peça.
        *
        * @method PUT
        * @param id
        * @param saldo
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
        var select = especificacao(id);
        
        select.then((especificacao) => {
            var saldo = req.body.saldo;
            // se a especificacao nao existir vai entrar no if
            if(especificacao.length == 0) {
                res.status(404).send({message: "Especificação não encontrada"});
            }else if(especificacao[0].is_active == false) {
                res.status(405).send({message: "Especificação esta desativada não pode alterar"});
            }else if(especificacao[0].saldo + saldo < 0) {
                res.status(400).send({message: 'Não tem em estoque'});
            }else {
                // se valor < 0 return S (saida), senao return E (entrada)
                let valor = saldo < 0 ? "s".toUpperCase() : "e".toUpperCase();
                var saldo = especificacao[0].saldo + saldo;
                /*  variavel responsavel por executar alterarQuantidade, passando o id da especificacao e a quantidade a ser alterada, podendo ser positiva(somando) e negativa(subtraindo) com o valor do banco de dados */
                alterarQuantidade(id, saldo).then(() => {
                    res.status(200).json(`foi alterado no estoque para: ${saldo}`);
                }).catch(err => {
                    console.log(err);
                    res.status(500).send({message: `falha ao atualizar a quantidade da peça`});
                });
            }
        });
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