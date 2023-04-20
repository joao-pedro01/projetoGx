import React, { useState } from "react"
import pms from './assets/logo_pms.png' // import logo prefeitura
import './stylesLogin.css'  //import estilizacao css
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Axios from 'axios';
import {BrowserRouter as Router, Link, Navigate, useNavigate} from 'react-router-dom';

function Login () {

    const [usuario, setUsuario] = useState ('')
    const [senha, setSenha] = useState('')
    const navigate = useNavigate();

     
    async function handleSubmit (e) {
        e.preventDefault();

        console.log(`usuario: ${usuario}`);
        console.log(`senha: ${senha}`);


        try {
          const res = await Axios.post('http://172.22.2.22:3030/api/entrar', {
            //          const res = await Axios.post('http://172.22.2.22:3030/api/cadastrar', {
            usuario,
            senha,
          });
          if (!res.data.erro) {
            console.log(res.data)
            navigate('/menu');
          } else {
            alert("Login invalido");
            console.log(res.data.erro);
          }
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <div className="container">
            <div className="boxLogin">
            <div className="login"> 
                <form className="formLogin" action="#" method="post" onSubmit={handleSubmit}> {/* capturar dados do form */}
                <span className="loginTitulo"><img src= {pms} className='img-fluid'></img></span> {/* imagem pms */} 
                <h1 className="loginTitulo"><b>ESTOQUE</b></h1> {/* titulo da pagina */}
                <div className='inputsL'> {/* div lista de inputs */}
                    <Form.Control type="text" placeholder="Nome de usuário" required
                    value= {usuario} onChange = {(e) => setUsuario(e.target.value)} />  {/* define o input digitado para a const user*/}
                </div>
                <div className='inputsL'>
                    <Form.Control type="password" placeholder="Senha" required
                    value= {senha} onChange = {(e) => setSenha(e.target.value)} /> {/* define o input digitado para a const password*/}
                </div>
                <div className='containerLoginBotao'>
                    <button type="submit" class="btn btn-primary btn-block">Entrar</button>
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