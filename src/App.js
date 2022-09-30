import pms from './assets/logo_pms.png' // import logo prefeitura
import './stylesLogin.css'  //import estilizacao css
import bootstrap from 'bootstrap' //import estilizacao bootstrap

function App() {
  return ( 
    <div className="container">
      <div className="boxLogin">
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
            </div>
          </form>
        </div>
      </div>
    </div>
  
  );
  }
  
  export default App;