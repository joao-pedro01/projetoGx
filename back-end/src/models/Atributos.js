import conn from "../config/dbConnect.js";

//function que faz a consulta de todas os atributos
export const listarAtributos = async(params) => {
    if(params == undefined){
      return await conn.select('*').table('atributos');
    }else {
      return await conn.select('*').table('atributos').where(params);
    }
}
export const cadastrarAtributo = async(atributo) => {
    return await conn.insert(atributo).table('atributos');
}
export const alterarAtributo = async(id, value) => {
    return await conn.update({ id: value }).where({id: id}).table('atributos');
}
export const desativarAtributo = async(id) => {
    return await conn.where({ id : id }).update({ is_active: false }).table('atributos');
}
