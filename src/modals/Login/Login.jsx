import React, { useContext, useState } from 'react';
import { Form, InputGroup, Modal, Nav } from 'react-bootstrap';
import Message from '../../components/Message';

//context
import { AuthContext } from '../../contexts/AuthContext';

const Login = () => {
  const { authentication, login } = useContext(AuthContext);

  const [user, setUser] = useState({});

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    login(user);
  };

  return (
    <>
      <div>
        <button onClick={handleShow} className="button-login">
          Login
        </button>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-container">
            <form className="input-container">
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
                <Form.Control
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="basic-addon1"
                  onChange={handleChange}
                  name="email"
                  type="email"
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
                <Form.Control
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                  onChange={handleChange}
                  name="password"
                  type="password"
                />
              </InputGroup>
            </form>
            <Message />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="button-login"
            variant="primary"
            onClick={handleClick}
          >
            Login
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
