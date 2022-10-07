import React from 'react';
import Button from 'react-bootstrap/Button'
import HeaderPMS from '../header/indexHeader'
import './stylesMenus.css'  //import estilizacao css

const Menus = () => { 
    return (
        <div className='MenuContainer'>
            <div>
                <HeaderPMS/>
            </div>

            <div className='top'>
                <a className='buttonOne' href='/menu'><div className='text-button'>Cadastrar Peças</div></a>
                <a className='buttonTwo' href='/menu'><div className='text-button'>Retirar Peças</div></a>
            </div>
            <div className='down'>
                <a className='buttonThree' href='/peca'><div className='text-button'>Listar Peças</div></a>
                <a className='buttonFour' href='/menu'><div className='text-button'>Relatório</div></a>
            </div>

        </div>
    )
}

export default Menus;