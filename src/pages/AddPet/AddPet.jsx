import React, { useState } from 'react';
import api from '../../utils/api';
import useFlashMessage from '../../hooks/useFlashMessages';
import PetForm from '../../components/PetForm/PetForm';
import Message from '../../components/Message';

import { useNavigate } from 'react-router-dom';

const AddPet = () => {
  const [token] = useState(localStorage.getItem('token' || ''));
  const { setFlashMessage } = useFlashMessage();

  const navigate = useNavigate();

  async function registerPet(pet) {
    let msgType = 'success';

    const formData = new FormData();

    await Object.keys(pet).forEach((key) => {
      if (key === 'images') {
        for (let i = 0; i < pet[key].lenght; i++) {
          formData.append('images', pet[key][i]);
        }
      } else {
        formData.append(key, pet[key]);
      }
    });

    const data = await api
      .post('pets/create', formData, {
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
    navigate('/pet/mypets');
  }
  return (
    <>
      <div className="container-pets">
        <div className="title-pets">Add Pet</div>
      </div>
      <PetForm handleClick={registerPet} />
      <Message />
    </>
  );
};

export default AddPet;
