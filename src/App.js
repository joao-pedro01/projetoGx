import pms from './assets/logo_pms.png'
import './styles.css'

function App() {
  return ( 
    <div className="container">
      <div className="boxLogin">
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
            </div>
          </form>
        </div>
      </div>
    </div>
  
  );
  }
  
  export default App;