import pecas from "../models/Pecas.js";

// class responsavel por todas acoes das pecas
class PecasController {
    // function que retorna todas as pecas
    static listarPecas = (req, res) => {
        res.status(200).json(pecas);
    };
    static peca = (req, res) => {
        var id = req.params.id;
        console.log(id);
        res.status(200).json(id);
    };
};

export default PecasController;