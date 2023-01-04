// api
import api from '../utils/api';

import { useEffect, useState } from 'react';

import useFlashMessage from './useFlashMessages';

function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
  }, []);

  async function register(user) {
    let msgText = 'Successful registration!';
    let msgType = 'success';

    try {
      const data = await api.post('/users/register', user).then((res) => {
        return res.data;
      });
      await authUser(data);
    } catch (error) {
      msgText = error.response.data.message;
      msgType = 'danger';
    }

    setFlashMessage(msgText, msgType);
  }

  async function login(user) {
    let msgText, msgType;

    try {
      const data = await api.post('/users/login', user).then((response) => {
        return response.data;
      });

      await authUser(data);
    } catch (error) {
      msgText = error.response.data.message;
      msgType = 'danger';
    }
    setFlashMessage(msgText, msgType);
  }

  async function authUser(data) {
    setAuthenticated(true);
    localStorage.setItem('token', JSON.stringify(data.token));
  }

  function logout() {
    setAuthenticated(false);
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined;
  }

  return { authenticated, register, logout, login };
}

export default useAuth;
