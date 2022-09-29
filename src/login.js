import logo from './logo_pms.png';
import './login.css';

function login() {
  return ( 
    <div className="container">
      <div className="box">
        <div>
          <img src={logo} className="login-pms" alt="logo"/>
            <h1>ESTOQUE GX</h1>
        </div>
      </div>
    </div>
/*
  <div className="login-main" id="login">
    <img src={logo} className="login-pms" alt="logo" />
    <h4> SIGAT GOLD </h4>
    <div className="Login" id="container">
      <form action="#" method="post">
        <input type="text" id="user" name="Name" placeholder='Insira seu usuario' required/><br></br>
        <input type="password" id="pass" name="password" placeholder='Senha' required></input><br></br>
        <input type="submit"></input>
      </form>
    </div>
  </div>

  
  */
  );
  }
  
  export default login;