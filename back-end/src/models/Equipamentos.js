import conn from "../config/dbConnect.js";
import var_dump from "var_dump";

// function que faz a consulta de todos pecas
export const listarEquipamentos = async(params) => {
  if(params == undefined){
    return await conn.select('*').table('equipamentos');
  }else {
    return await conn.select('*').table('equipamentos').where(params);
  }
}

export const equipamento = async(id) => {
  return await conn.select('nome','patrimonio', 'is_active').table('equipamentos').where('id', id);
}

export const peca_atributos = async(id) => {
  return await conn.select().table('equipamentos_atributos')
    .innerJoin( 'atributos', 'atributos.id', 'equipamentos_atributos.id_atributo')
    .where('equipamentos_atributos.id_peca', id);
}

export const cadastrarPeca = async(dados) => {
  return await conn.insert(dados).into("equipamentos");
}

export const desativarPeca = async(id) => {
  return await conn.where({id: id}).update({is_active: false}).table('equipamentos');
}

export const alterarQuantidade = async(id, value) => {
  return await conn.update({ qnt: value }).where({id: id}).table('equipamentos');
}