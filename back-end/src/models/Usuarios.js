import conn from "../config/dbConnect.js";

export const cadastrarUsuario = async(dados) => {
  return await conn.insert(dados).into("usuarios");
}