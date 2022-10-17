import { cadastrarUsuario } from '../models/Usuarios.js';
import bcrypt from "bcryptjs";
import { dd } from './functions.js';
// class responsavel por todas acoes do usuario
class UsuarioController {
    // function que retorna os usuarios
    static listarUsuarios = (req, res) => {
        res.status(200).json(usuarios);
    }

    static cadastrarUsuario = (req, res) => {
        var nome = req.body.nome;
        var senha = req.body.senha;
        let data = new Date();
        let dataFormatada = data.getFullYear() + "/" + ((data.getMonth() + 1)) + "/" + ((data.getDate() ));

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(senha, salt);
        var query = {
            nome: nome,
            senha: hash,
            criado: dataFormatada
        };
        cadastrarUsuario(query).then((usuario) => {
            res.status(200).send({message: 'Usuario cadastrado com sucesso'});
        }).catch(err => {
            console.log(err);
            res.status(500).send({message: `falha ao cadastrar usuario`});
        });
    }
}

export default UsuarioController;