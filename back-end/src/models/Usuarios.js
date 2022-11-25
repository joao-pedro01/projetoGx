import conn from "../config/dbConnect.js";
import { dd } from "../controllers/functions.js";

export const cadastrarUsuario = async(dados) => {
  return await conn.insert(dados).into("usuarios");
}

export const loginUsuario = async(dados) => {
  return await conn.select('id', 'nome', 'criado', 'is_active').first().table('usuarios').where(dados);
}