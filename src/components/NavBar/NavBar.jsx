import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import mainLogo from '../../assets/dog-nose.png';
import './NavBar.css';

//bootstrap
import {
  InputGroup,
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap';

//icon
import { BiSearchAlt2 } from 'react-icons/bi';

//context
import { AuthContext } from '../../contexts/AuthContext';

//modals
import Register from '../../modals/Register/Register';
import Login from '../../modals/Login/Login';

const NavBar = () => {
  const { authenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <Navbar className="nav-bar">
      <Container fluid>
        <Navbar.Brand href="/">
          <img className="logo" src={mainLogo} alt="link"></img>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0">
            {!authenticated && (
              <>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/pets">Adopt</Nav.Link>
              </>
            )}
            {authenticated && (
              <>
                <Nav.Link href="/" className="link">
                  Home
                </Nav.Link>
                <Nav.Link href="/profile" className="link">
                  Profile
                </Nav.Link>
                <NavDropdown title="My Pets" id="navbarScrollingDropdown">
                  <NavDropdown.Item className="link" href="/pet/mypets">
                    My Pets
                  </NavDropdown.Item>
                  <NavDropdown.Item className="link" href="/pet/add">
                    Add a Pet
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
          <Form>
            <InputGroup className="d-flex">
              <Button variant="light" id="button-addon1">
                <BiSearchAlt2 className="icon" />
              </Button>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </Form>
          <div className="nav-bar-button">
            {!authenticated && (
              <>
                <Login />
                <Register />
              </>
            )}
            {authenticated && (
              <>
                <button className="button-login" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
