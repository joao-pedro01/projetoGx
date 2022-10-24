import conn from "../config/dbConnect.js";

// function que faz a consulta de todos pecas
export const listarPecas = async(params) => {
  if(params == undefined){
    return await conn.select('*').table('pecas');
  }else {
    return await conn.select('*').table('pecas').where(params);
  }
}

export const peca = async(id) => {
  return await conn.select('nome','sku', 'qnt', 'is_active').table('pecas').where('id', id);
}

export const peca_atributos = async(id) => {
  return await conn.select().table('pecas_atributos')
    .innerJoin( 'atributos', 'atributos.id', 'pecas_atributos.id_atributo')
    .where('pecas_atributos.id_peca', id);
}

export const cadastrarPeca = async(dados) => {
  return await conn.insert(dados).into('pecas');
}

export const cadastrarAtributo = async(id_peca, id_atributo, valor) => {
  return await conn.insert({id_peca, id_atributo, valor}).into('pecas_atributos')
}

export const desativarPeca = async(id, status) => {
  return await conn.where({id: id}).update({is_active: status}).table('pecas');
}

export const desativarAtributo = async(id) => {
  return await conn.where({ id_peca: id }).update({ is_active: false }).table('pecas_atributos');
}
export const alterarQuantidade = async(id, value) => {
  return await conn.update({ qnt: value }).where({id: id}).table('pecas');
}