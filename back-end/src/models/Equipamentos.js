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