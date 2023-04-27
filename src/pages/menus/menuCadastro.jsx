import React from 'react';
import Button from 'react-bootstrap/Button'
import HeaderPMS from '../header/indexHeader'
import './stylesMenus.css'  //import estilizacao css
import { FaPowerOff, FaRegListAlt, FaListUl } from 'react-icons/fa'; //import dos icons
import { BsArchiveFill, BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";
import { GoPlus, GoDash} from "react-icons/go";
import { TbReportAnalytics } from "react-icons/tb";

const MenusCad = () => { 
    return (
        <div className='MenuContainer'>
                <HeaderPMS/>
            <div className='top'>
                <a className='buttonOne' href='/cadastro/atributos'><div className='text-button'><b>Cadastro de Atributos</b></div></a>
                <a className='buttonTwo' href='/cadastro/categoria'><div className='text-button'><b>Cadastro de Categorias</b></div></a>
            </div>
            <div className='down'>
                <a className='buttonThree' href='/cadastro/equipamentos'><div className='text-button'><b>Cadastro de Equipamentos</b></div></a>
                <a className='buttonFour' href='/cadastro/pecas'><div className='text-button'><b>Cadastro de Peças</b></div></a>
            </div>

        </div>
    )
}

export default MenusCad;