import { copiarObjecto, dd } from './functions.js';

// class responsavel por todas acoes do usuario
class SkuController {
    static GerarSku = (nome) => {
        var sku;
        let skuDados = copiarObjecto(nome);
        
        let i = 0;

        for (const column in skuDados) {
            if(column !== "fk_categorias_id" && column !== "saldo") {
                if(skuDados[column].length <= 2) {
                    skuDados[column] = 0 + skuDados[column];
                }
                
                sku = i > 0 ? sku + skuDados[column].substr(0,3) : skuDados[column].substr(0,3);
                i++;
                if(i == 7){
                    break;
                }
            }
        }
        sku = sku.toUpperCase();
        return sku;
    }
}

export default SkuController;