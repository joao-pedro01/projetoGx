import React from 'react';
import Button from 'react-bootstrap/Button'
import HeaderPMS from '../header/indexHeader'
import './stylesMenus.css'  //import estilizacao css
import { FaPowerOff, FaRegListAlt, FaListUl } from 'react-icons/fa'; //import dos icons
import { BsArchiveFill, BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";
import { GoPlus, GoDash} from "react-icons/go";
import { TbReportAnalytics } from "react-icons/tb";

const Menus = () => { 
    return (
        <div className='MenuContainer'>
                <HeaderPMS/>
            <div className='top'>
                <span className="top"><a className='buttonOne' href='/cadastro/pecas'><div className='text-button'><BsFillCaretUpFill /></div></a></span>
                <a className='buttonTwo' href='/remover'><div className='text-button'><BsFillCaretDownFill /></div></a>
            </div>
            <div className='down'>
                <a className='buttonThree' href='/pecas'><div className='text-button'><FaListUl /></div></a>
                <a className='buttonFour' href='/relatorio'><div className='text-button'><TbReportAnalytics /></div></a>
            </div>

        </div>
    )
}

export default Menus;