import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import api from '../../utils/api';

import './MyPets.css';

//hooks
import useFlashMessage from '../../hooks/useFlashMessages';
import Message from '../../components/Message';

function MyPets() {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem('token') || '');
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api
      .get('/pets/mypets', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPets(response.data.pets);
      });
  }, [token]);

  async function removePet(id) {
    let msgType = 'success';

    const data = await api
      .delete(`/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        const updatedPets = pets.filter((pet) => pet._id !== id);
        setPets(updatedPets);
        return response.data;
      })
      .catch((err) => {
        msgType = 'error';
        return err.response.data;
      });

      setFlashMessage(data.message, msgType);
  }

  return (
    <>
      <div className="container-pets">
        <div className="title-pets">My Pets</div>
        <NavLink to="/pet/add">Register a pet here</NavLink>
        <div className="container-mypets">
          <Message />
          {pets.length > 0 &&
            pets.map((pet) => {
              return (
                <div key={pet._id} className="container-dash">
                  <img
                    src={`http://localhost:5000/images/pets/${pet.images[0]}`}
                    alt={pet.name}
                    className="img-pets"
                  />
                  <div className="container-pets-each">
                    <div>
                      {pet.name} ({pet.type})
                    </div>
                    <div>{pet.age}</div>
                    <div>color: {pet.color}</div>
                    <div>breed: {pet.breed}</div>
                    <div>
                      {pet.available ? (
                        <>
                          {pet.adopter && (
                            <button className="btn-edit">
                              Conclude adoption
                            </button>
                          )}
                          <NavLink to={`/pet/edit/${pet._id}`}>Edit</NavLink>
                          <button
                            className="btn-del"
                            onClick={() => {
                              removePet(pet._id);
                            }}
                          >
                            Delete
                          </button>
                        </>
                      ) : (
                        <p>Pet already adopted</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          {pets.length === 0 && <p>You don't have any registered pets</p>}
        </div>
      </div>
    </>
  );
}

export default MyPets;
