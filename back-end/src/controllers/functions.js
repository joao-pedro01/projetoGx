import var_dump from "var_dump";

export function dd(params) {
    var_dump(params);
    process.exit();
}

export function removeNull(Object) {    
    Object.map(obj => {
        for(const column in obj) {
            if(obj[column] == null) {
                console.log(column, '=', obj[column]);
                delete obj[column];
            }
        }
    });
}

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
        }
    });
}