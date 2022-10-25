import React from 'react';
import Button from 'react-bootstrap/Button'
import HeaderPMS from '../header/indexHeader'
import './stylesMenus.css'  //import estilizacao css
import { AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineAudit, AiOutlineBars } from "react-icons/ai";

const Menus = () => { 
    return (
        <div className='MenuContainer'>
                <HeaderPMS/>
            <div className='top'>
                <span className="top"><a className='buttonOne' href='/menucadastro'><div className='text-button'><AiOutlineArrowUp /> Cadastrar</div></a></span>
                <a className='buttonTwo' href='/remover'><div className='text-button'><AiOutlineArrowDown/> Retirar</div></a>
            </div>
            <div className='down'>
                <a className='buttonThree' href='/pecas'><div className='text-button'><AiOutlineBars /> Listar Peças</div></a>
                <a className='buttonFour' href='/relatorio'><div className='text-button'><AiOutlineAudit /> Relatórios</div></a>
            </div>

        </div>
    )
}

export default Menus;