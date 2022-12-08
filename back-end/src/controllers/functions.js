import var_dump from "var_dump";
import jwt from "jsonwebtoken";

export function dd(params) {
    var_dump(params);
    process.exit();
};

export function removeNull(obj) {
    Object.keys(obj).forEach(key => {
        if (obj[key] === null) {
          delete obj[key];
        }
    });
    /* Object.keys(obj).forEach(key => {
        console.log(obj[key])
        if(obj[key] == null) {
            dd("test")
            delete obj[key];
        };
    }); */
};

export function removeUndefined(obj) {
    Object.keys(obj).forEach(key => {
        if(obj[key] === undefined) {
            delete obj[key];
        };
    });
};

export function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];

    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
}

/* https://www.webtutorial.com.br/funcao-para-gerar-uma-string-aleatoria-random-com-caracteres-especificos-em-javascript */
export function stringRamdom(tamanho) {
    var stringAleatoria = '';
    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < tamanho; i++) {
        stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return stringAleatoria;
}