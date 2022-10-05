import var_dump from "var_dump";
import conn from "../config/dbConnect.js";

// function que faz a consulta de todos pecas
const listarPecas = async(params) => {
  return await conn.select('*').table('pecas').where(params);
}

const peca = async(id) => {
  return await conn.select('nome','sku', 'is_active').table('pecas').where('id', id);
}

const peca_atributos = async(id) => {
  return await conn.select().table('pecas_atributos')
    .innerJoin('pecas', 'pecas.id', 'pecas_atributos.id_pecas')
    .innerJoin( 'atributos', 'atributos.id', 'pecas_atributos.id_atributos')
    .where('pecas.id', 9);
}

const cadastrarPeca = async(dados) => {
  conn.insert(peca).into("pecas");
}

const desativarPeca = async(id) => {
  return await conn.where({id: id}).update({is_active: false}).table('pecas');
}

export { listarPecas, peca, peca_atributos, cadastrarPeca, desativarPeca };