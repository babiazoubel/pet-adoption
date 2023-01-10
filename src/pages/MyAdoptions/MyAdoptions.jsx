import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import './MyAdoptions.css';

const MyAdoptions = () => {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    api
      .get('/pets/myadoptions', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPets(response.data.pets);
      });
  }, [token]);

  return (
    <div className="container-pets">
      <div className="title-pets">My Adoptions</div>
      <div className="box-title">
        {pets.length > 0 &&
          pets.map((pet) => (
            <div key={pet._id} className="box-pet-adoption">
              <div className="pet-adoption-name">
                <img
                  src={`http://localhost:5000/images/pets/images/pets/${pet.images[0]}`}
                  alt={pet.name}
                  className="img-pets"
                />

                <div className="pet-to-adopt">
                  <div className="name-pet">{pet.name}</div>
                  <div className="title-list">
                    <span className="text-list">Call to:</span> {pet.user.name}
                  </div>
                  <div className="title-list">
                    <span className="text-list">Phone: </span> {pet.user.phone}
                  </div>
                </div>
              </div>

              <div className="text-list">
                {pet.available ? (
                  <p>Adoption in process...</p>
                ) : (
                  <p>Congratulations! You adopted your new best friend!</p>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyAdoptions;
