import conn from "../config/dbConnect.js";
import { dd } from "../controllers/functions.js";

export const listarUsuarios = async() => {
  return await conn.select('*').table('usuarios').where({'is_active': true});
}

export const cadastrarUsuario = async(dados) => {
  return await conn.insert(dados).into('usuarios');
}

export const loginUsuario = async(usuario) => {
  return await conn.select('id', 'nome', 'criado', 'is_active').table('usuarios').first().where(usuario);
}