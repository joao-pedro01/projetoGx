import conn from "../config/dbConnect.js";

// function que faz a consulta de todos pecas
export const listarEquipamentos = async(params) => {
  if(params == undefined){
    return await conn.select('*').table('equipamentos');
  }else {
    return await conn.select('*').table('equipamentos').where(params);
  }
}

export const equipamento = async(id) => {
  return await conn.select('nome', 'numero', 'is_active').table('equipamentos').where('id', id);
}

export const equipamento_atributos = async(id) => {
  return await conn.select().table('equipamentos_atributos')
    .innerJoin( 'atributos', 'atributos.id', 'equipamentos_atributos.id_atributo')
    .where('equipamentos_atributos.id_equipamento', id);
}

export const cadastrarEquipamento = async(dados) => {
  return await conn.insert(dados).into('equipamentos');
}

export const desativarEquipamento = async(id, status) => {
  return await conn.where({id: id}).update({is_active: status}).table('equipamentos');
}

export const desativarAtributo = async(id) => {
  return await conn.where({ id_peca: id }).update({ is_active: false }).table('equipamentos_atributos');
}