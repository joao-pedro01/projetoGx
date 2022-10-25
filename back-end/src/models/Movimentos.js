import conn from "../config/dbConnect.js";

export const cadastrarMovimento = async(dados) => {
    return await conn.insert(dados).into('movimentos');
}
  