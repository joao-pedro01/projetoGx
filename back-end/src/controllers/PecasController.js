/* import pecas from "../models/Pecas.js"; */
import conn from "../config/dbConnect.js"

// class responsavel por todas acoes das pecas
class PecasController {
    // function que retorna todas as pecas
    static listarPecas = (req, res) => {
        conn.select('*').table('p').then(users => {
            console.log(users);
          });
        res.status(200).json(pecas);
    };
    static peca = (req, res) => {
        var id = req.params.id;
        
        function peca(id) {

            return new Promise((resolve, reject) => {
                conn.select('*').table('pecas').where('id', id).then(peca => {
                    console.log(peca);
                    resolve (peca);
                });
            });
        }
        peca = peca(id);
        console.log(peca);
        res.status(200).json(peca);
    };
};

export default PecasController;