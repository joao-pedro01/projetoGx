import React, { useState } from 'react';
import Header from "../header/indexHeader"; //import do Header
import AsyncSelect from 'react-select/async';
import { AiOutlineDownload } from "react-icons/ai"; //import dos Icons
import Button from 'react-bootstrap/Button'; //import Button do Bootstrap

const Relatorio = () => { 
    return (
        <div>
            <Header /> 
            <div className='container'>
                <div className='boxCAD'>
                <h3><b>Retirada de Relatório</b></h3>
                <AsyncSelect cacheOptions defaultOptions value={''} getOptionLabel={e => e.atributo} loadOptions={''} placeholder="Selecione o Relatório..." min="4" max="8" />
                <Button className= "botaoCadastro" variant="primary" href=""><AiOutlineDownload /> Download</Button>
                </div>
            </div>
       </div>
    )
}

export default Relatorio;