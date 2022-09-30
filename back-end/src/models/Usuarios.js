import conn from "../config/dbConnect.js"

// function que faz a consulta de todos usuarios
function listarUsuarios() {
  return new Promise((resolve, reject) => {
    conn.select('*').table('usuarios').then(users => {
      console.log(users);
    });
  });
};

const usuarios = await listarUsuarios();
export default usuarios;