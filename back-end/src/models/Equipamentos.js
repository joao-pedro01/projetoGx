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
  return await conn.select('nome', 'patrimonio', 'is_active').table('equipamentos').where('id', id);
}

export const equipamento_atributos = async(id) => {
  return await conn.select().table('equipamentos_atributos')
    .innerJoin( 'atributos', 'atributos.id', 'equipamentos_atributos.id_atributo')
    .where('equipamentos_atributos.id_equipamento', id);
}