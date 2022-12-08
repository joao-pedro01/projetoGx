import {
    alterarQuantidade,
    cadastrarCategoria,
    desativarCategoria,
    listarCategorias
} from '../models/Categoria.js';
import { dd, removeNull, removeUndefined } from './functions.js';

// class responsavel por todas acoes das pecas
class CategoriasController {
    /**
    * Lista todas categorias.
    *
    * @method GET
    * @param status : boolean
    * @param categoria : string
    * @param tipo : string
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
        
        if(query) {
            query.is_active = status;
            var select = listarCategorias(query);

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
    * Cadastra categoria.
    *
    * @method POST
    * @param nome
    * @param tipo
    * @return (200) - message
    * @return (405) - dados solicitados não recebido da forma correta
    * @return (422) - já existe no banco de dados e não pode repetir
    * @return (500) - erro interno servidor
    * 
    * caso não receber os dados solicitador irá retornar 405
    * caso contrário irá criar var para o select e executar, se o numero do categoria já se encontrar na base de dados irá retornar 422
    * caso contrário irá executar o insert e retornar 200, caso der erro irá retornar 500
    */
    static cadastrarCategoria = (req, res) => {
        var dados = req.body;
        
        cadastrarCategoria(dados).then((categoria) => {
            res.status(200).send({message: `${dados.nome} foi cadastrada com sucesso ${categoria}`})
        }).catch((err => {
            if(err['errno'] == 1062) {
                res.status(422).send({message: `${dados.nome} já existe cadastrado`});
            }else {
                res.status(500).send({message: `falha ao cadastrar categoria`});
            }
        }));
    }

    /**
    * Altera a quantidade da categoria.
    *
    * @method PUT
    * @param id : id
    * @param qnt : int
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
    static alterarQuantidadeCategoria = (req, res) => {
        var id = req.params.id;
        let select = listarCategorias({ id: id });
        select.then((categoria) => {
            var saldo = req.body.saldo;
            // se a categoria nao existir vai entrar no if e retornar erro senão vai verificar se esta desativada retornando 405
            if(categoria.length == 0) {
                res.status(404).send({message: "Categoria não encontrada"});
            }else if(categoria[0].is_active == false) {
                res.status(405).send({message: "Categoria esta desativada não pode alterar"});
            }else {
                // se valor < 0 return S (saida), senao return E (entrada)
                /* let valor = saldo < 0 ? "s".toUpperCase() : "e".toUpperCase(); */
                var saldo = categoria[0].qnt + saldo;
                let update = alterarQuantidade(id, saldo);
                update.then(() => {
                    res.status(200).json(`${categoria[0].nome} foi alterado no estoque para: ${saldo}`);
                }).catch(err => {
                    console.log(err);
                    res.status(500).send({message: `falha ao atualizar a quantidade da Categoria`});
                })
                
                /* update.then(() => {
                    let query = {
                        id_usuario: req.body.id_usuario,
                        id_peca: id,
                        tipo: valor,
                        valor: categoria[0].saldo
                    };
                    cadastrarMovimento(query);
                }).catch(err => {
                    console.log(err);
                    res.status(500).send({message: `falha ao atualizar a quantidade da Categoria`});
                }) */
            }
        })
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
    * irá fazer o select para verificar se a atributo informado via GET existe
    * caso não existir ira retornar 404 caso contrário irá verificar se a atributo já se encontra desativado caso a atributo estar inativo irá retornar 405
    * caso passar por todas etapas irá criar variavel de update enviando o valor caso ok retorna 200 caso contrário 500
    */
     static desativarCategoria = (req, res) => {
        var id = req.params.id;
        var select = listarCategorias({ id: id });

        select.then((categoria) => {
            // se a categoria nao existir vai entrar no if
            if(categoria.length == 0) {
                res.status(404).json("Categoria não existe");
            }else if(categoria[0].is_active == false) {
                res.status(405).json("Categoria já esta desativada");
            }else {
                var update = desativarCategoria(id, false);
                // caso passar por todos os if ira desativar a categoria
                update.then(() => {
                    res.status(200).json(`${categoria[0].nome} desativado(a) com sucesso`);
                }).catch(err => {
                    console.log(err);
                    res.status(500).send({message: `falha ao desativar categoria`});
                });
            }
        });
    }
}

export default CategoriasController;