import usuarios from "./models/Usuario.js";

class UsuarioController {
    static listarUsuarios = (req, res) => {
        usuarios.find((err, usuarios) => {
            res.status(200).json(usuarios);
        });
    }
    static consultaUsuario = (req, res) => {
        
    }
}

export default UsuarioController;