import conn from "../config/dbConnect.js";

export const listarEspecificacoes = async() => {
  return await conn
  .select('*').from('especificacoes')
  .innerJoin('categorias', 'categorias.id', 'especificacoes.fk_categorias_id')
}

export const listarCategorias = async() => {
  return await conn.select('*').table('categorias');
}

export const listarCategoriasEspecificacoes = async() => {
  return await conn.select('*').table('especificacoes')
  .innerJoin( 'categorias', 'especificacoes.fk_categorias_id', 'categorias.id');
}