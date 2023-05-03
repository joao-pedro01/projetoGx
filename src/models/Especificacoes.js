import conn from "../config/dbConnect.js";
import { dd } from "../controllers/functions.js";

// function que faz a consulta de todos pecas
export const listarEspecificacoes = async(params) => {
  if(params == undefined){
    return await conn.select('*').table('especificacoes');
  }else {
    return await conn
      .table('especificacoes')
      .select(
        'especificacoes.*',
        'categorias.id as id_cat',
        'categorias.is_active as is_active_cat',
        'categorias.tipo as tipo_cat',
        'categorias.marca_cat',
        'categorias.atrib1_cat',
        'categorias.atrib2_cat',
        'categorias.atrib3_cat',
        'categorias.atrib4_cat',
        'categorias.atrib5_cat',
        'categorias.atrib6_cat'
      )
      .where('especificacoes.is_active', params.is_active)
      .innerJoin('categorias', 'especificacoes.fk_categorias_id', 'categorias.id');
  }
}

export const BuscaEspespecificacao = async(query) => {
  return await conn
  .select('marca', 'modelo', 'is_active', 'saldo')
  .table('especificacoes')
  .where(query);
}

export const especificacao = async(id) => {
  return await conn.select('marca', 'modelo', 'is_active', 'saldo').table('especificacoes').where('id', id);
}


export const cadastrarEspecificacao = async(dados) => {
  return await conn
  .insert(dados)
  .into('especificacoes')
}

export const alterarQuantidade = async(id, value) => {
    return await conn.update({ saldo: value }).where({id: id}).table('especificacoes');
  }

export const desativarEspecificacao = async(id) => {
    return await conn.where({ id: id }).update({ is_active: false }).table('especificacoes');
}