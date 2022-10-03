import React from "react";
import "./styleHeader.css";

const Header = () => {
    return (
        <nav class="navbar navbar-dark bg-dark">
            <div class="dd">
                <div class="search">
                    <form>
                        <input class="bar_search" type="search" placeholder="Pesquisar" aria-label="Pesquisar"/>
                        <button class="search_button" type="submit">Pesquisar</button>
                    </form>
                </div>
                <div class="Logo_pms">
                    <a class="navbar-brand" href="#" /*logo do site*/>
                        <img src="http://sigat.sorocaba.sp.gov.br/img/logo_pms.png" width="30" height="30" class="d-inline-block align-top" alt=""/> ESTOQUE GX
                    </a>
                </div>
            </div>
        </nav>
    );  
}
export default Header;

