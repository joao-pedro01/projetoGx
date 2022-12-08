
import { dd, removeUndefined } from './functions.js';

// class responsavel por todas acoes das pecas
class EspecificacoesController {
    /**
    * 
    *
    * @method GET
    * @param 
    * @return 
    * 
    * 
    */
    static listarEspecificacoes = (req, res) => {
        res.status(500).send({message: 'deu certo'})   
    }
}

export default EspecificacoesController;