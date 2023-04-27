import React, { useState } from "react"
import pms from './assets/logo_pms.png' // import logo prefeitura
import './stylesLogin.css'  //import estilizacao css
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Axios from 'axios';

const Login = () => {

    const [user, setUser] = useState ('')
    const [password, setPassword] = useState('')
     
    const handleSubmit = (e) => { 
      e.preventDefault()
      Axios.post('http://172.16.9.95:8080/api/login',{user, password})
      .then(function (response){
        console.log(response)
        console.log("submit:",{user, password})
      })
      .catch(function(error){
        console.log(error)
      })
    }
    return (
        <div className="container">
            <div className="boxLogin">
            <div className="login"> 
                <form className="formLogin" action="#" method="post" onSubmit={handleSubmit}> {/* capturar dados do form */}
                <span className="loginTitulo"><img src= {pms} className='img-fluid'></img></span> {/* imagem pms */} 
                <h1 className="loginTitulo"><b>ESTOQUE</b></h1> {/* titulo da pagina */}
                <Alert className="border" variant="danger">
                        Usuário/senha incorretos ou usuário não encontrado!
                </Alert>
                <div className='inputsL'> {/* div lista de inputs */}
                    <Form.Control type="text" placeholder="Nome de usuário" required
                    value= {user} onChange = {(event) => setUser(event.target.value)} />  {/* define o input digitado para a const user*/}
                </div>
                <div className='inputsL'>
                    <Form.Control type="password" placeholder="Senha" required
                    value= {password} onChange = {(event) => setPassword(event.target.value)} /> {/* define o input digitado para a const password*/}
                </div>
                <div className='containerLoginBotao'>
                    <button type="submit" className="btn btn-primary btn-block" >Entrar</button>
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