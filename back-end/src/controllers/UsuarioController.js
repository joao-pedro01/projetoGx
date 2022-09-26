/* import usuarios from "../models/Usuarios.js"; */

// class responsavel por todas acoes do usuario
class UsuarioController {
    // function que retorna os usuarios
    static listarUsuarios = (req, res) => {
        res.status(200).json(usuarios);
    };
};

export default UsuarioController;