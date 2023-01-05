import { dd } from './functions.js';

// class responsavel por todas acoes do usuario
class SkuController {
    static GerarSku = (id, nome) => {
        /* deleteCategoria(nome); */

        var sku;
        var skuDados = nome;
        let i = 0;
        for (const column in skuDados) {
            if(skuDados[column].length <= 2) {
                skuDados[column] = 0 + skuDados[column];
            }

            sku = i > 0 ? sku + skuDados[column].substring(0,3) : skuDados[column].substring(0,3);
            i++;
            if(i == 7){
                break;
            }
        }
        
        return sku;
    }
}

/* export function deleteCategoria(obj) {
    let i = 4;
    for (const column in obj) {
        if(column == `atrib${i}_cat`){
            delete obj[column];
            i++;
        }
    }
}; */

export default SkuController;