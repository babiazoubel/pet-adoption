import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import api from '../../utils/api';

import './MyPets.css';

//hooks
import useFlashMessage from '../../hooks/useFlashMessages';
import Message from '../../components/Message';

function MyPets() {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem('token') || '');
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

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

  async function concludeAdoption(id) {
    let msgType = 'success';
    const data = await api
      .patch(`/pets/conclude/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
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
        <div className="title-pets">My Pets</div>
        <NavLink to="/pet/add">Register a new pet here</NavLink>
        <div className="text-pet">
          Organize and controll your pets for adoption
        </div>
        <div className="container-mypets">
          <Message />
          {pets.length > 0 &&
            pets.map((pet) => {
              return (
                <div key={pet._id} className="container-dash">
                  <div className="box-img-mypets">
                    <img
                      src={`http://localhost:5000/images/pets/${pet.images[0]}`}
                      alt={pet.name}
                      className="img-pets"
                    />
                    <div className="box-buttons-pet">
                      {pet.available ? (
                        <>
                          <div>
                            {pet.adopter && (
                              <button
                                className="btn-conclude"
                                onClick={() => {
                                  concludeAdoption(pet._id);
                                }}
                              >
                                Conclude adoption
                              </button>
                            )}
                          </div>

                          <div>
                            <NavLink to={`/pet/edit/${pet._id}`}>Edit</NavLink>
                            <button
                              className="btn-del"
                              onClick={() => {
                                removePet(pet._id);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      ) : (
                        <p className="text-adopted">Pet already adopted</p>
                      )}
                    </div>
                  </div>

                  <div className="container-pets-each">
                    <div className="text-box">
                      <div className="text-list">
                        <span className="name-pet">{pet.name} </span>({pet.type}
                        )
                      </div>
                      <div className="title-list">
                        <span className="text-list">Age:</span> {pet.age}
                      </div>
                      <div className="title-list">
                        <span className="text-list">Breed:</span> {pet.breed}
                      </div>
                      <div className="title-list">
                        <span className="text-list">Weight:</span> {pet.weight}
                        kg
                      </div>
                      <div className="title-list">
                        <span className="text-list">Height: </span> {pet.height}
                        cm
                      </div>

                      <div className="title-list">
                        <span className="text-list">Hypoallergenic: </span>
                        {pet.hypoallergenic}
                      </div>
                      <div className="title-list">
                        <span className="text-list">
                          Dietary Restrictions:{' '}
                        </span>
                        {pet.dietaryRestrictions}
                      </div>
                      <div className="title-list">
                        <span className="text-list">Bio:</span> {pet.bio}
                      </div>
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
