import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import './PetDetails.css';
import { Link, useParams } from 'react-router-dom';

//hooks
import useFlashMessage from '../../hooks/useFlashMessages';

//components
import Message from '../../components/Message';
import Register from '../../modals/Register/Register';
import Button from '../../components/Button/Button';

const PetDetails = () => {
  const [pet, setPet] = useState({});
  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();
  const [token] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    api.get(`/pets/${id}`).then((response) => {
      setPet(response.data.pet);
    });
  }, [id]);

  async function schedule() {
    let msgType = 'success';

    const data = await api
      .patch(`pets/schedule/${pet._id}`, {
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
  }

  return (
    <>
      <div className="container-pets">
        <div className="title-pets">Pet Details</div>
        <div className="box-title">
          <div className="text-pet">
            Meet, <span className="name-pet">{pet.name}</span> - a great{' '}
            {pet.type}!
          </div>
          <div className="text-pet">{`If you're interested, schedule a visit to meet it!`}</div>
        </div>

        <div className="box-all">
          <div className="box-img">
            {pet.images?.map((image, index) => (
              <img
                src={`http://localhost:5000/images/pets/${image}`}
                alt={pet.name}
                key={`${pet.name}+${index}`}
                className="img-details"
              />
            ))}
          </div>
          
          <div className="box-details-all">
            <div className="box-details">
              <div className="title-list">
                <span className="text-list">Age:</span> {pet.age} years
              </div>
              <div className="title-list">
                <span className="text-list">Weight:</span> {pet.weight}kg
              </div>
              <div className="title-list">
                <span className="text-list">Height:</span> {pet.height}cm
              </div>
              <div className="title-list">
                <span className="text-list">Color:</span> {pet.color}
              </div>
              <div className="title-list">
                <span className="text-list">Breed:</span> {pet.breed}
              </div>
              {pet.hypoallergenic ? (
                <div className="title-list">
                  <span className="text-list">Hypoallergenic:</span>
                  {pet.hypoallergenic}
                </div>
              ) : (
                <div className="title-list">
                  <span className="text-list">Hypoallergenic: </span>
                  --
                </div>
              )}
              {pet.dietaryRestrictions ? (
                <div className="title-list">
                  <span className="text-list">Dietary Restrictions:</span>
                  {pet.dietaryRestrictions}
                </div>
              ) : (
                <div className="title-list">
                  <span className="text-list">Dietary Restrictions: </span>
                  --
                </div>
              )}
              {pet.bio ? (
                <div className="title-list">
                  <span className="text-list">Bio: </span>
                  {pet.bio}
                </div>
              ) : (
                <div className="title-list">
                  <span className="text-list">Bio: </span>
                  --
                </div>
              )}
            </div>
            <div>
              {token ? (
                <Button onClick={schedule}>Adopt</Button>
              ) : (
                <div className="text-register">
                  Do you need to create an account to schedule a visit and adopt
                  <Register />
                </div>
              )}
            </div>
          </div>
          <Message />
        </div>
      </div>
    </>
  );
};

export default PetDetails;
