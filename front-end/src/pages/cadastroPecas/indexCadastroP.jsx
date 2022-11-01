import React, {useEffect, useState} from 'react';
import HeaderPMS from '../header/indexHeader'
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
  const [nome, setNome] = useState ('')
  const [sku, setSKU] = useState ('')
  const [saldo, setSaldo] = useState('')
  const [categoria, setCategoria] = useState('')

  const handleInputChange = value => { 
    setValue(value)
    console.log("onClick",{value, setValue})
  }

  const handleChange = value => {
    setSelectedValue(value)
    console.log("valores2",{value, setValue})
  }
  const fetchData = () => {
    Axios.get('http://172.22.2.22:8080/api/categorias')
    .then(res => {
      console.log("Getting from ::::", res.data)
    }).catch(err => console.log(err))
}

  const handleSubmit = (e) => { 
    Axios.post('http://172.22.2.22:8080/api/pecas',{nome, saldo, sku})
    .then(function (response){
      console.log(response)
      console.log("submit:",{nome, saldo, sku})
    })
    .catch(function(error){
      console.log(error)
      console.log("teste:",{setValue})
    })
  }

  //const arr = data?.map((data, index) => {
  //  return (
  //    {value: }
  //  )
  // })

    return (
        <div className='header'>
            <HeaderPMS/> 
            <div className='container'>
                <div className='boxCAD'>
                    <div className='atributos'>
                      <form className='formCPecas' onSubmit={handleSubmit}>
                        <InputGroup className="mb-3">
                          <InputGroup.Text id="basic-addon1"><AiFillTool></AiFillTool></InputGroup.Text>
                          <Form.Control
                            type="text"
                            placeholder="Nome da Peça..."
                            aria-label="nomepeca"
                            aria-describedby="basic-addon1"
                            value={nome} onChange={(e) => setNome(e.target.value)}
                          />
                        </InputGroup>
                        <AsyncSelect
                        cacheOptions
                        defaultOptions
                        value={selectedValue}
                        getOptionLabel={e => e.categorias}
                        loadOptions={fetchData}
                        onInputChange={handleInputChange}
                        onChange={handleChange}
                        placeholder="Selecione a categoria..."
                      />                    
                        <InputGroup className="mb-3 mt-3">
                          <InputGroup.Text id="basic-addon1"><AiOutlineFieldNumber></AiOutlineFieldNumber></InputGroup.Text>
                          <Form.Control
                            type="text"
                            placeholder="Quantidade..."
                            aria-label="quantidade"
                            aria-describedby="basic-addon1"
                            value={saldo} onChange={(e) => setSaldo(e.target.value)}
                          />
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <InputGroup.Text id="basic-addon1"><BsFileEarmarkCode></BsFileEarmarkCode></InputGroup.Text>
                          <Form.Control
                            placeholder="Sku..."
                            aria-label="sku"
                            aria-describedby="basic-addon1"
                            value={sku} onChange={(e) => setSKU(e.target.value)}
                          />
                        </InputGroup>
                      <span className="cadastroButton"><Button type="submit" className="mt-3" variant="success">Cadastrar</Button>{' '}</span>
                      </form>       
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