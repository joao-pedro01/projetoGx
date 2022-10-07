import var_dump from "var_dump";



export function dd(params) {
    var_dump(params);
    process.exit();
}

export async function setheader() {
    teste = {
        'Access-Control-Allow-Origin': '*'
    }
    return await {'Access-Control-Allow-Origin': '*'};
}