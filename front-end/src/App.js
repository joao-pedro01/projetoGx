<<<<<<< HEAD
import pms from './assets/logo_pms.png' // import logo prefeitura
import './stylesLogin.css'  //import estilizacao css
import bootstrap from 'bootstrap' //import estilizacao bootstrap
=======
import pms from './assets/logo_pms.png'
import './styles.css'
>>>>>>> 205708b06c21e674553debeb58cc9770fff5cbcf

function App() {
  return ( 
    <div className="container">
      <div className="boxLogin">
<<<<<<< HEAD
        <div className="login"> 
          <form className="formLogin" action="#" method="post"> {/* capturar dados do form */}
          <span className="loginTitulo"><img src= {pms} className='img-fluid'></img></span> {/* imagem pms */} 
            <h1 className="loginTitulo">ESTOQUE</h1> {/* titulo da pagina */}
            <div className='inputsL'> {/* div lista de inputs */}
              <input className="input" type="text" placeholder="Nome de usuário" />
            </div>
            <div className='inputsL'>
              <input className="input" type="password" placeholder="Senha" />
            </div>
            <div className='containerLoginBotao'>
              <button type="button" class="btn btn-primary btn-block">Entrar</button>
=======
        <div className="login">
          <form className="formLogin">
          <span className="loginTitulo"><img src= {pms} alt="Prefeitura Municipal de Sorocaba"></img></span>
            <h1 className="loginTitulo">Bem vindo</h1>
            <div className='inputsL'>
              <input className="input" type="email" />
            </div>
            <div className='inputsL'>
              <input className="input" type="password" />
            </div>
            <div className='containerLoginBotao'>
            <button className="loginBotao"> Login </button>
>>>>>>> 205708b06c21e674553debeb58cc9770fff5cbcf
            </div>
          </form>
        </div>
      </div>
    </div>
  
  );
  }
  
  export default App;