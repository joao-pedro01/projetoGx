import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button'
import HeaderPMS from '../header/indexHeader'
import './stylesCadastroP.css'  //import estilizacao css
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Axios from 'axios';
import {BiPlus} from 'react-icons/bi'


const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    &#x25bc;
  </a>
));

const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <Form.Control
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value),
          )}
        </ul>
      </div>
    );
  },
);

const CadastroP = () => {
  
  const [nome, setNome] = useState ('')
  const [sku, setSKU] = useState ('')
  const [qnt, setQnt] = useState('')
   
  const handleSubmit = (e) => { 
    e.preventDefault()
    Axios.post('http://172.16.9.95:8080/api/pecas',{nome, sku, qnt})
    .then(function (response){
      console.log(response)
      console.log("submit:",{nome, sku, qnt})
    })
    .catch(function(error){
      console.log(error)
    })
  }
  
  var cont = 4;
  const onClickMais = () => { 
    console.log('botão clicado')
   do {
      if(cont>7)   {
        return
      }
      document.getElementById("dropdownAdicional").innerHTML += `<button type="button" id="dropdown-basic-button" aria-expanded="false" class="mb-1 dropdown-toggle btn btn-success">Atributo #${cont+1}</button><div class="dropdown-menu" aria-labelledby="dropdown-basic-button" style="position: absolute; inset: 0px auto auto 0px; transform: translate(0px, 40px);"><input placeholder="Type to filter..." class="mx-3 my-2 w-auto form-control" value=""><ul class="list-unstyled"><a href="#/action-1" data-rr-ui-dropdown-item="" class="dropdown-item">1</a><a href="#/action-2" data-rr-ui-dropdown-item="" class="dropdown-item">2</a><a href="#/action-3" data-rr-ui-dropdown-item="" class="dropdown-item">3</a></ul></div><br>`;
      console.log(cont)
      cont++;
  } while (cont>7)
}

    return (
        <div className='header'>
            <HeaderPMS/> 
            <div className='container'>
                <div className='box'>
                    <div className='atributos'>
                      <Dropdown>
                        <Dropdown.Toggle  variant="success" id="dropdown-basic-button" className="mb-1">
                            Atributo #1
                        </Dropdown.Toggle>
                        <Dropdown.Menu as={CustomMenu}>
                            <Dropdown.Item href="#/action-1">1</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">2</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">3</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                            <Dropdown.Toggle  variant="success" id="dropdown-basic-button" className="mb-1">
                            Atributo #2
                        </Dropdown.Toggle>
                          <Dropdown.Menu as={CustomMenu}>
                            <Dropdown.Item href="#/action-1">1</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">2</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">3</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown>
                            <Dropdown.Toggle  variant="success" id="dropdown-basic-button" className="mb-1">
                            Atributo #3
                        </Dropdown.Toggle>
                          <Dropdown.Menu as={CustomMenu}>
                            <Dropdown.Item href="#/action-1">1</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">2</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">3</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                            <Dropdown.Toggle  variant="success" id="dropdown-basic-button" className="mb-1">
                            Atributo #4
                        </Dropdown.Toggle>
                          <Dropdown.Menu as={CustomMenu}>
                            <Dropdown.Item href="#/action-1">1</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">2</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">3</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <div id="dropdownAdicional">
                        </div>
                        <Dropdown.Menu as={CustomMenu}>
                            <Dropdown.Item href="#/action-1">1</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">2</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">3</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>  
                    <span className='maisButton' onClick={onClickMais}><button className='botaoMais'><BiPlus /></button></span>                  
                </div>
                
                  <div className='formCPecas'>
                    <span>cadastro teste</span>
                    <form className='formCPecas' onSubmit={handleSubmit}> 
                      <Form.Control type="text" placeholder="Nome da Peça" required value={nome} onChange={(e) => setNome(e.target.value)}/> 
                      <Form.Control type="text" placeholder="SKU" required value={sku} onChange={(e) => setSKU(e.target.value)}/>
                      <Form.Control type="text" placeholder="Quantidade" required value={qnt} onChange={(e) => setQnt(e.target.value)}/> 
                    <div className='containerLoginBotao'>
                      <button type="submit" class="btn btn-primary btn-block" >Entrar</button>
                    </div>
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