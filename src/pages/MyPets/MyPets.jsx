import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './MyPets.css';

function MyPets() {
  const [pets, setPets] = useState([]);
  return (
    <>
      <div className="container-pets">
        <div className="title-pets">My Pets</div>
        <NavLink to="/pet/add">Register a pet here</NavLink>
        <div>
          {pets.length > 0 && <p>My registered pets</p>}
          {pets.length === 0 && <p>You don't have any registered pets</p>}
        </div>
      </div>
    </>
  );
}

export default MyPets;
