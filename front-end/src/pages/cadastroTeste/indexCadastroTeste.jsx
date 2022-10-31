import React, {useEffect, useState} from 'react'
import HeaderPMS from '../header/indexHeader'
import Dropdown from 'react-bootstrap/Dropdown'
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

const CadastroTeste = () => {

  function Case1() {
    
  }


  const [nome, setNome] = useState ('')
  const [sku, setSKU] = useState ('')
  const [qnt, setQnt] = useState('')
   
  const [data, setDate] = useState();

  useEffect(() => {
      Axios.get('http://172.16.9.95:8080/api/pecas')
      .then(res => {
        console.log("Getting from ::::", res.data)
        setDate(res.data)
      }).catch(err => console.log(err))
  }, []);


  const arr = data?.map((data, index) => {
    return (
      {value: 'nome', label:' test' }
    )
  })
    return (
        <div className='header'>
            <HeaderPMS/> 
            <div className='container'>
                <div className='boxCAD'>
                    <div className='atributos'>
                      <p><b>Cadastro Atributos</b></p>
                      <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={(Case1)}>Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>      
            </div>
        </div>
    </div>
    </div>
    )
}

export default CadastroTeste;


//  ---- todo ----
// tela de cadastro e transformar em para -> peça/categoria/atributo/equipamento
// "+ botao" para o dropdown de atributos no cadastro de peça
// const Cadastro = () => { 
// }  export default Cadastro;
//nested stringfy 