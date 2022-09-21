import conn from "../config/dbConnect.js"

// function que faz a consulta de todos usuarios
function listUsuarios() {
  return new Promise((resolve, reject) => {
    conn.query('SELECT * from usuarios', function (error, results, fields) {
      if (error) throw error;
        resolve(results);
    });
  });
};

const usuarios = await listUsuarios();
export default usuarios;