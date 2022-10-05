import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import '../header/styleHeader.css'
import Logo from './assets/logo_pms.png'

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
      {[false].map((expand) => (
        <Navbar key={expand} bg="dark" expand={expand} className="mb-3" variant="dark">
          <Container fluid>
            <div className="removeUnderline">
              <Link to="/menu"><Navbar.Brand><img className='imgNav' src={Logo}></img>
              <span className='logoNav'><strong>ESTOQUE</strong></span></Navbar.Brand></Link>
            </div>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Busca rápida"
                className="me-2"
                aria-label="search"
              />
              <Button className='search-button' variant="outline-primary">Buscar</Button>
            </Form>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              {/* sidebar button */}
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Cadastro
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="login">Adicionar Peça</Nav.Link>
                  <Nav.Link href="#action2">Remover Peça</Nav.Link>
                  <NavDropdown /* */
                    title="Relatórios"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                  <span className="exitSpan"><Button className="exitButton"variant="danger" size="sm" >Sair</Button></span>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Header

// todo
// 