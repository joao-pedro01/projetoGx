import conn from "../config/dbConnect.js";

// function que faz a consulta de todos pecas
export const listarCategorias = async(params) => {
  if(params == undefined){
    return await conn.select('*').table('categorias');
  }else {
    return await conn.select('*').table('categorias').where(params);
  }
}