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