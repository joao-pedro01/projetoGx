import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import '../header/stylesHeader.css';
import Logo from './assets/logo_pms.png';
import { FaPowerOff, FaSearch, FaSignOutAlt  } from 'react-icons/fa';
import Cookies  from 'js-cookie';
import jwt from 'jwt-decode';
import { AuthContext } from '../../AuthContext';
import React , { useContext, useState, useEffect } from 'react';

import { 
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
  useNavigate
} from "react-router-dom";


function Header() {
  const { token } = useContext(AuthContext);
  const tokenCookies = Cookies.get('jwt_authorization');
  console.log("tokenCookies:" + tokenCookies);
  const decoded = jwt(Cookies.get('jwt_authorization'));
  console.log(decoded);
  const { api } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('/entrar');
      setData(response.data);
    };
    fetchData();
  }, [api]);
  
  return (
    <>
        <Navbar  bg="dark" variant="dark">
          <Container fluid>
            <div className="removeUnderline">
              <Link to="/menu"><Navbar.Brand><img className='imgNav' src={Logo}></img>
              <span className='logoNav'><strong>ESTOQUE</strong></span></Navbar.Brand></Link>
            </div>
            <Form className="d-flex justify-content-center">
                <Form.Control
                  type="search"
                  placeholder="Busca rápida"
                  className="me-2"
                  aria-label="search"
                />
                <Button className='search-button me-2' variant="primary"><FaSearch /></Button>
            </Form>
            <div>
              <span className='welcome'><strong>Olá {decoded.nome}</strong></span>
              <Link to="/">
                <Button className='search-button me-1' variant="danger"><FaSignOutAlt /> Logoff</Button>
              </Link>
            </div>
          </Container>
        </Navbar>
    </>
  );
}

export default Header

// todo
// 