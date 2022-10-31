import conn from "../config/dbConnect.js";

// function que faz a consulta de todos pecas
export const listarCategorias = async(params) => {
  if(params == undefined){
    return await conn.select('*').table('categorias');
  }else {
    return await conn.select('*').table('categorias').where(params);
  }
}

export const cadastrarCategoria = async(dados) => {
  return await conn.insert(dados).into('categorias');
}

export const desativarCategoria = async(id, status) => {
  return await conn.where({id: id}).update({is_active: status}).table('categorias');
}
