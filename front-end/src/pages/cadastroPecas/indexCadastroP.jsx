import React, {useState} from 'react';
import Button from 'react-bootstrap/Button'
import HeaderPMS from '../header/indexHeader'
import './stylesCadastroP.css'  //import estilizacao css
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import axios from 'axios';


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



function CadastroP () {
  const [nome, setNome] = useState ('');
  const [sku, setSKU] = useState ('');

  const handleSubmit = async(e) => { 
    e.prevenDefault();
    try { 
      const resp = await axios.post('https://course-api.com/axios-tutorial-post', {nome: nome, sku: sku})
      console.log(resp.data);
    } catch (error) { 
        console.log(error.response);
    }
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
                            <Dropdown.Item href="#/action-1">1 </Dropdown.Item>
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
                </div>
                  <div className='formCPecas'>
                    <span>cadastro teste</span>
                    <form className='formCPecas' onSubmit={handleSubmit}> 
                      <Form.Control type="text" placeholder="Nome da Peça" required/> 
                      <Form.Control type="text" placeholder="SKU" required/>
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


//  ---- todo ----
// tela de cadastro e transformar em para -> peça/categoria/atributo/equipamento
// "+ botao" para o dropdown de atributos no cadastro de peça
// const Cadastro = () => { 
// }  export default Cadastro;