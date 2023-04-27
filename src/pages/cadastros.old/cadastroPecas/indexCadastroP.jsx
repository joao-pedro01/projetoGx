import React, {useEffect, useState} from 'react';
import HeaderPMS from '../../header/indexHeader'
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { AiFillTool } from "react-icons/ai";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { BsFileEarmarkCode } from "react-icons/bs";
import Button from 'react-bootstrap/Button'



const CadastroP = () => {


  const [nome, setNome] = useState ('')
  const [sku, setSKU] = useState ('')
  const [saldo, setSaldo] = useState('')
  const [categoria, setCategoria] = useState('')
  const [valores, setValores] = useState([])
  const [vatributos, setVAtributos] = useState([])
  const [atributos, setAtributos] = useState([])


useEffect(() => {
  Axios.get('http://172.22.2.22:3030/api/categorias')
  .then(res => {
    console.log("Getting from ::::", res.data)
    setValores(res.data)
  }).catch(err => console.log(err))
  Axios.get('http://172.22.2.22:3030/api/atributos')
  .then(res => {
    console.log("Getting from ::::", res.data)
    setVAtributos(res.data)
  }).catch(err => console.log(err))
}, []);

  const handleSubmit = (e) => { 
    Axios.post('http://172.22.2.22:8080/api/pecas',{nome, saldo, sku})
    .then(function (response){
      console.log(response)
      console.log("submit:",{nome, saldo, sku})
    })
    .catch(function(error){
      console.log(error)
    })
  }

    return (
        <div className='header'>
            <HeaderPMS/> 
            <div className='container'>
                <div className='boxCAD'>
                    <div className='atributos'>
                    <h3><b>Cadastro de Peças</b></h3>
                      <form className='formCPecas' onSubmit={handleSubmit}>
                        <Form.Select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                          <option value="0">Selecione a categoria...</option>
                          {valores.map((categorias) => (
                            <option key={categorias.id} value={categorias.id}>
                              {categorias.nome}
                            </option>
                          ))}
                        </Form.Select> 
                        <Form.Select className="mt-3" value={atributos} onChange={(e) => setAtributos(e.target.value)} onSelect={<HeaderPMS/>}> {// descobrir como fazer esse onSelect
                        }<option value="0">Selecione um atributo...</option>
                          {vatributos.map((atributos) => (
                            <option key={atributos.id} value={atributos.id}>
                              {atributos.nome}
                            </option>
                          ))}
                        </Form.Select> 
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
                      <span className="button-cadastrar"><Button type="submit" className="mt-3" variant="success">Cadastrar</Button>{' '}</span>
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