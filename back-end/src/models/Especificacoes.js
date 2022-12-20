import conn from "../config/dbConnect.js";
import { dd } from "../controllers/functions.js";

// function que faz a consulta de todos pecas
export const listarEspecificacoes = async(params) => {
  if(params == undefined){
    return await conn.select('*').table('especificacoes');
  }else {
    return await conn
      .select('*')
      .table('especificacoes')
      .where('especificacoes.is_active', params.is_active)
      .innerJoin('categorias', 'especificacoes.fk_categorias_id', 'categorias.id');
  }
}

export const especificacao = async(id) => {
    return await conn.select('marca', 'modelo', 'is_active', 'saldo').table('especificacoes').where('id', id);
}

// export const equipamento_atributos = async(id) => {
// return await conn.select().table('equipamentos_atributos')
//     .innerJoin( 'atributos', 'atributos.id', 'equipamentos_atributos.id_atributo')
//     .where('equipamentos_atributos.id_equipamento', id);
// }

export const cadastrarEquipamento = async(dados) => {
    return await conn.insert(dados).into('equipamentos');
}

export const alterarQuantidade = async(id, value) => {
    return await conn.update({ saldo: value }).where({id: id}).table('especificacoes');
  }

export const desativarEspecificacao = async(id) => {
    return await conn.where({ id: id }).update({ is_active: false }).table('especificacoes');
}