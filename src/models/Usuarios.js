import conn from "../config/dbConnect.js"

const usuarios = conn.connect(function(err) {
    if (err) throw err;
    conn.query("SELECT * FROM usuarios", function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  });
const listarUsuarios = usuarios
export default listarUsuarios;