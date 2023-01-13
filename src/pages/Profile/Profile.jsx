import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { Form, InputGroup } from 'react-bootstrap';
import Button from '../../components/Button/Button';
import './Profile.css';
import useFlashMessage from '../../hooks/useFlashMessages';
import Message from '../../components/Message';

const Profile = () => {
  const [user, setUser] = useState({});
  const [preview, setPreview] = useState();
  const [token] = useState(localStorage.getItem('token') || '');

  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api
      .get('/users/checkuser', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      });
  }, [token]);

  const onFileChange = (e) => {
    setPreview(e.target.files[0]);
    setUser({ ...user, [e.target.name]: e.target.files[0] });
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  async function handleClick(e) {
    e.preventDefault();
    let msgType = 'success';
    const formData = new FormData();

    await Object.keys(user).forEach((key) => formData.append(key, user[key]));

    const data = await api
      .patch(`/users/edit/${user._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        msgType = 'danger';
        return err.response.data;
      });

      setFlashMessage(data.message, msgType);
  }

  return (
    <>
      <div className="container-profile">
        <div className="title-profile">Profile</div>

        <div className="avatar-container">
          {(user.image || preview) && (
            <img
              src={
                preview
                  ? URL.createObjectURL(preview)
                  : `http://localhost:5000/images/users/${user.image}`
              }
              alt={user.name}
              className="avatar-img"
            />
          )}
        </div>
        <form className="imput-container">
          <InputGroup className="mb-3">
            <Form.Control
              aria-label="Image"
              aria-describedby="basic-addon1"
              name="image"
              type="file"
              onChange={onFileChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
            <Form.Control
              placeholder="Name"
              aria-label="Name"
              aria-describedby="basic-addon1"
              name="name"
              type="name"
              value={user.name || ''}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Last Name</InputGroup.Text>
            <Form.Control
              placeholder="Last Name"
              aria-label="Last Name"
              aria-describedby="basic-addon1"
              name="lastName"
              type="name"
              value={user.lastName || ''}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Phone Number</InputGroup.Text>
            <Form.Control
              placeholder="Phone Number"
              aria-label="Phone"
              aria-describedby="basic-addon1"
              name="phone"
              type="phone"
              value={user.phone || ''}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
            <Form.Control
              placeholder="Email"
              aria-label="Last Name"
              aria-describedby="basic-addon1"
              name="email"
              type="email"
              value={user.email || ''}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
            <Form.Control
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon1"
              name="password"
              type="password"
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              Confirm Password
            </InputGroup.Text>
            <Form.Control
              placeholder="Confirm Password"
              aria-label="Confirm Password"
              aria-describedby="basic-addon1"
              name="confirmPassword"
              type="password"
              onChange={handleChange}
            />
          </InputGroup>
          <Button onClick={handleClick}>Update</Button>
        </form>
        <Message />
      </div>
    </>
  );
};

export default Profile;
