import logo from './logo_pms.png';
import './login.css';

function login() {
  return (
  <div className="login-main">
    <img src={logo} className="login-pms" alt="logo" />
    <h4> Estoque GX </h4>
    <div className="Login">
      <form action="#" method="post">
        <input type="text" id="user" name="Name" placeholder='Insira seu usuario' required/><br></br>
        <input type="password" id="pass" name="password" placeholder='Senha' required></input><br></br>
        <input type="submit"></input>
      </form>
    </div>
  </div>
  );
  }
  
  export default login;