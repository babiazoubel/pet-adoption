import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/api';

import './EditPet.css';

//components
import PetForm from '../../components/PetForm/PetForm';
import Message from '../../components/Message';

//hooks
import useFlashMessage from '../../hooks/useFlashMessages';

const EditPet = () => {
  const [pet, setPet] = useState({});
  const [token] = useState(localStorage.getItem('token') || '');
  const { id } = useParams(); //find the pet with its url id

  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPet(response.data.pet);
      });
  }, [token, id]);

  async function updatePet(pet) {
    let msgType = 'success';
    const formData = new FormData();

    await Object.keys(pet).forEach((key) => {
      if (key === 'images') {
        for (let i = 0; i < pet[key].length; i++) {
          formData.append('images', pet[key][i]);
        }
      } else {
        formData.append(key, pet[key]);
      }
    });

    const data = await api
      .patch(`pets/${pet._id}`, formData, {
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
    navigate('/pet/mypets')
  }

  return (
    <div className="container-pets">
      <div className="title-pets">Edit Pet</div>
      <div>Editing {pet.name}</div>
      {pet.name && (
        <PetForm btnText="Edit Pet" petData={pet} handleSubmit={updatePet} />
      )}
      <Message />
    </div>
  );
};

export default EditPet;
