import React, {useEffect, useState} from 'react';
import HeaderPMS from '../header/indexHeader'
import './stylesCadastroP.css'  //import estilizacao css
import Axios from 'axios';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import AsyncSelect from 'react-select/async';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { AiFillTool } from "react-icons/ai";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { BsFileEarmarkCode } from "react-icons/bs";
import Button from 'react-bootstrap/Button'


const animatedComponents = makeAnimated();

const CadastroP = () => {

  const [inputValue, setValue] = useState ('')
  const [selectedValue, setSelectedValue] = useState(null)
  

  const handleInputChange = value => { 
    setValue(value)
  }

  const handleChange = value => {
    setSelectedValue(value)
  }
  const fetchData = () => {
    return 
  }
    return (
        <div className='header'>
            <HeaderPMS/> 
            <div className='container'>
                <div className='boxCAD'>
                    <div className='atributos'>
                      <>
                        <InputGroup className="mb-3">
                          <InputGroup.Text id="basic-addon1"><AiFillTool></AiFillTool></InputGroup.Text>
                          <Form.Control
                            placeholder="Nome da Peça..."
                            aria-label="nomepeca"
                            aria-describedby="basic-addon1"
                          />
                        </InputGroup>
                      </>
                      <>
                        <InputGroup className="mb-3">
                          <InputGroup.Text id="basic-addon1"><AiOutlineFieldNumber></AiOutlineFieldNumber></InputGroup.Text>
                          <Form.Control
                            placeholder="Quantidade..."
                            aria-label="quantidade"
                            aria-describedby="basic-addon1"
                          />
                        </InputGroup>
                      </>
                      <>
                        <InputGroup className="mb-3">
                          <InputGroup.Text id="basic-addon1"><BsFileEarmarkCode></BsFileEarmarkCode></InputGroup.Text>
                          <Form.Control
                            placeholder="Sku..."
                            aria-label="sku"
                            aria-describedby="basic-addon1"
                          />
                        </InputGroup>
                      </>
                      <AsyncSelect
                        cacheOptions
                        defaultOptions
                        value={selectedValue}
                        getOptionLabel={e => e.atributo}
                        loadOptions={fetchData}
                        placeholder="Selecione os atributos..."
                        min="4"
                        max="8"
                      />
                      <span className="cadastroButton"><Button className="mt-3" variant="success">Cadastrar</Button>{' '}</span>       
                </div>
            </div>
        </div>
    </div>
    )
}

export default CadastroP;



/*   ---- todo ----
 tela de cadastro e transformar em para -> peça/categoria/atributo/equipamento
 "+ botao" para o dropdown de atributos no cadastro de peça
 const Cadastro = () => { 
 }  export default Cadastro;
nested stringfy  */