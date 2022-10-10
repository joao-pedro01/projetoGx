import conn from "../config/dbConnect.js";
import var_dump from "var_dump";

// function que faz a consulta de todos pecas
const listarPecas = async(params) => {
  if(params == undefined){
    return await conn.select('*').table('pecas');
  }else {
    return await conn.select('*').table('pecas').where(params);
  }
}

const peca = async(id) => {
  return await conn.select('nome','sku', 'is_active').table('pecas').where('id', id);
}

const peca_atributos = async(id) => {
  return await conn.select().table('pecas_atributos')
    .innerJoin( 'atributos', 'atributos.id', 'pecas_atributos.id_atributo')
    .where('pecas_atributos.id_peca', id);
}

const cadastrarPeca = async(dados) => {
  return await conn.insert(dados).into("pecas");
}

const desativarPeca = async(id) => {
  return await conn.where({id: id}).update({is_active: false}).table('pecas');
}

export { listarPecas, peca, peca_atributos, cadastrarPeca, desativarPeca };