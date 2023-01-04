import React, { useContext, useState } from 'react';
import { Form, InputGroup, Modal } from 'react-bootstrap';
import Button from '../../components/Button/Button';
import Message from '../../components/Message';

//contexts
import { AuthContext } from '../../contexts/AuthContext';

const Register = () => {
  const [user, setUser] = useState({});
  const { register } = useContext(AuthContext);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    register(user);
  };

  return (
    <>
      <div>
        <Button onClick={handleShow}>Register</Button>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-container">
            <form className="input-container">
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
                <Form.Control
                  placeholder="Name"
                  aria-label="Name"
                  aria-describedby="basic-addon1"
                  onChange={handleChange}
                  name="name"
                  type="name"
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Last Name</InputGroup.Text>
                <Form.Control
                  placeholder="Last Name"
                  aria-label="Last Name"
                  aria-describedby="basic-addon1"
                  onChange={handleChange}
                  name="lastName"
                  type="name"
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  Phone number
                </InputGroup.Text>
                <Form.Control
                  placeholder="Phone number"
                  aria-label="Phone number"
                  aria-describedby="basic-addon1"
                  onChange={handleChange}
                  name="phone"
                  type="tel"
                />
              </InputGroup>
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
                  type="password"
                  name="password"
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  Confirm password
                </InputGroup.Text>
                <Form.Control
                  placeholder="Confirm password"
                  aria-label="Confirm password"
                  aria-describedby="basic-addon1"
                  onChange={handleChange}
                  type="password"
                  name="confirmPassword"
                />
              </InputGroup>
            </form>
            <Message />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClick}>Register</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Register;
