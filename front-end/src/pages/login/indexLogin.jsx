import React, { useState } from "react"
import pms from './assets/logo_pms.png' // import logo prefeitura
import './stylesLogin.css'  //import estilizacao css
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => { 
    const[user, setUser] = useState(""); {/* definicao da variavel user e password (como npadrao vazio) para autenticacao */}
    const[password, setPassword] = useState("");

    const handleSubmit = (event) => { {/* cria o evento para fazer o submit dos dados user e password*/}
         event.preventDefault();
        console.log("submit", {user, password});
    }

    return (
        <div className="container">
            <div className="boxLogin">
            <div className="login"> 
                <form className="formLogin" action="#" method="post" onSubmit={handleSubmit}> {/* capturar dados do form */}
                <span className="loginTitulo"><img src= {pms} className='img-fluid'></img></span> {/* imagem pms */} 
                <h1 className="loginTitulo">ESTOQUE</h1> {/* titulo da pagina */}
                <div className='inputsL'> {/* div lista de inputs */}
                    <Form.Control type="text" placeholder="Nome de usuário" required
                    value= {user} onChange = {(event) => setUser(event.target.value)} />  {/* define o input digitado para a const user*/}
                </div>
                <div className='inputsL'>
                    <Form.Control type="password" placeholder="Senha" required
                    value= {password} onChange = {(event) => setPassword(event.target.value)} /> {/* define o input digitado para a const password*/}
                </div>
                <div className='containerLoginBotao'>
                    <button type="submit" class="btn btn-primary btn-block" >Entrar</button>
                </div>
                </form>
            </div>
            </div>
        </div>
    );
}


export default Login;


//                     <input className="input" name="nome" type="text" placeholder="Nome de usuário" required
//                     value = {user} onChange = {(event) => setUser(event.target.value)} />  {/* define o input digitado para a const user*/}
//                     <input className="input" type="password" placeholder="Senha"
//                     value = {password} onChange = {(event) => setPassword(event.target.value)}/>