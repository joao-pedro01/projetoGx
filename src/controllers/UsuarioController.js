import listarUsuarios from "../models/Usuarios.js";

class UsuarioController {
    static listarUsuarios = (req, res) => {
        listarUsuarios.find((err, listarUsuarios) => {
            res.status(200).find(listarUsuarios);
        });
    }

    
}

export default UsuarioController;