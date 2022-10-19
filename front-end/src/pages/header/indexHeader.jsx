import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import '../header/stylesHeader.css';
import Logo from './assets/logo_pms.png';

import { 
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";


function Header() {
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
                <Button className='search-button me-2 disabled' variant="primary">Buscar</Button>
            </Form>
            <Button className='search-button me-1 disabled' variant="danger">Desconectar</Button>
          </Container>
        </Navbar>
    </>
  );
}

export default Header

// todo
// 