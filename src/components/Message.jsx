import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import bus from '../utils/bus';

function Message() {
  const [visibility, setVisibility] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    bus.addListener('flash', ({ message, type }) => {
      setVisibility(true);
      setMessage(message);
      setType(type);

      setTimeout(() => {
        setVisibility(false);
      }, 3000);
    });
  }, []);

  return visibility && <Alert variant={type}>{message}</Alert>;
}

export default Message;
