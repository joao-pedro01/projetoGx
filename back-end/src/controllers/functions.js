import var_dump from "var_dump";

export function dd(params) {
    var_dump(params);
    process.exit();
}