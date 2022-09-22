import conn from "../config/dbConnect.js"

// function que faz a consulta de todos pecas
function listarPecas() {
  return new Promise((resolve, reject) => {
    conn.select('*').table('usuarios').then(users => {
      console.log(users);
    });
  });
};

function peca(req, res) {
  return new Promise((resolve, reject) => {
    conn.query('SELECT * from pecas WHERE id =1', function (error, results, fields) {
      if (error) throw error;
        resolve(results);
    });
  });
};

const pecas = await listarPecas();

export default pecas;