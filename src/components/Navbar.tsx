import React, {useContext} from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAddressBook, faBuildingColumns, faCreditCard, faMoneyBills, faMoneyCheck, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";


const NavigationBar: React.FC = () => {
    const authContext = useContext(AuthContext);

    return (
       
        <Navbar bg="dark" variant="dark" expand="md" className="mt-2 rounded-2 mb-1 ">
          <Container fluid={true} >
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Principal</Nav.Link>
                
                <NavDropdown title="Cadastros" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/contatos"><FontAwesomeIcon className="text-primary" icon={faAddressBook} /> Contatos</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/contas"><FontAwesomeIcon className="text-success" icon={faBuildingColumns} /> Contas</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/formapagamentos"><FontAwesomeIcon className="text-warning" icon={faCreditCard} /> Formas de pagamento</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Finaneiro" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/recebers"><FontAwesomeIcon className="text-success" icon={faMoneyCheck} /> Contas a receber</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/pagars"><FontAwesomeIcon className="text-danger" icon={faMoneyBills} /> Contas a pagar</NavDropdown.Item>
                </NavDropdown>
              </Nav>

              <Nav className="ms-auto" >
                <NavDropdown title={authContext?.user} id="basic-nav-dropdown" align="end">
                    {authContext?.isAuthenticated && <NavDropdown.Item  onClick={authContext.logout}><FontAwesomeIcon icon={faRightFromBracket} />  Sair</NavDropdown.Item> }
                </NavDropdown>
              </Nav>

            </Navbar.Collapse>
          </Container>
        </Navbar>
    );
}

export default NavigationBar;
