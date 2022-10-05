import React from 'react';
import Button from 'react-bootstrap/Button'
import HeaderPMS from '../header/indexHeader'

const Menus = () => { 
    return (
        <div className='MenuContainer'> 
            <HeaderPMS/>
            <Button variant="primary">Adicionar</Button>{' '}
            <Button variant="success">Remover</Button>{' '}
            <Button variant="warning">Listagem</Button>{' '}
            <Button variant="danger">Relatórios</Button>{' '}
            <div className='buttonOne'>
                <a href="/pecas"><h1> Adicionar </h1></a>
            </div>
        </div>
    )
}

export default Menus;