import React from 'react';
import Button from 'react-bootstrap/Button' //import Button do Bootstrap
import HeaderPMS from '../header/indexHeader' //import Header
import './stylesMenus.css'  //import estilizacao css
import { AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineAudit, AiOutlineBars } from "react-icons/ai"; //import dos Icons

const Menus = () => { 
    return (
        <div className='MenuContainer'>
                <HeaderPMS/>
            <div className='top'>{/*Buttons da parte de cima, Cadastrar e Retirar*/}
                <span className="top"><a className='buttonOne' href='/menucadastro'><div className='text-button'><AiOutlineArrowUp /> <b>Cadastrar</b></div></a></span>
                <a className='buttonTwo' href='/Retirada'><div className='text-button'><AiOutlineArrowDown/> <b>Retirar</b></div></a>
            </div>
            <div className='down'>{/*Buttons da parte de baixo, Listar P. e Relatório*/}
                <a className='buttonThree' href='/pecas'><div className='text-button'><AiOutlineBars /> <b>Listar P.</b></div></a>
                <a className='buttonFour' href='/relatorio'><div className='text-button'><AiOutlineAudit /> <b>Relatórios</b></div></a>
            </div>

        </div>
    )
}

export default Menus;