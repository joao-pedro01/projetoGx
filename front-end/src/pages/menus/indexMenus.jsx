import React from 'react';
import Button from 'react-bootstrap/Button'
import HeaderPMS from '../header/indexHeader'
import './stylesMenus.css'  //import estilizacao css

const Menus = () => { 
    return (
        <div className='MenuContainer'>
                <HeaderPMS/>
            <div className='top'>
                <span className="top"><a className='buttonOne' href='/cadastro'><div className='text-button'>Cadastrar Peças</div></a></span>
                <a className='buttonTwo' href='/remover'><div className='text-button'>Retirar Peças</div></a>
            </div>
            <div className='down'>
                <a className='buttonThree' href='/pecas'><div className='text-button'>Listar Peças</div></a>
                <a className='buttonFour' href='/relatorio'><div className='text-button'>Relatório</div></a>
            </div>

        </div>
    )
}

export default Menus;