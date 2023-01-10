import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const imgPet = require('../../assets/dog-bg2.png');
  const [pets, setPets] = useState([]);

  useEffect(() => {
    api.get('/pets').then((response) => {
      setPets(response.data.pets);
    });
  }, []);

  return (
    <>
      <section>
        <div className="container-home">
          <div>
            <img src={imgPet} alt="dog" className="img-dog" />
          </div>
          <div className="title-box">
            <div className="title">Welcome to Mutt Lovers</div>
            <div className="sub-title">Adopt your next best friend</div>
            <div className="text">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Repudiandae, et voluptates consectetur quidem nihil pariatur harum
              asperiores, quo, accusamus distinctio neque culpa! Quisquam magni
              accusamus vitae illum, ullam corrupti repellat.
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="box-text-home">
          <div className="container-adopt"></div>
          <div className="title-pet">Adopt a Pet</div>
          <div className="sub-title-pet">Look at our cute pets available</div>
          <div className="text-pet">
            Click on the one you liked the most, see more details and get in
            touch with its tutor
          </div>
        </div>
        <div className="center-list">
          <div className="box-all-home">
            {pets.length > 0 &&
              pets.map((pet) => (
                <div key={pet._id} className="pet-box">
                  <img
                    src={`http://localhost:5000/images/pets/${pet.images[0]}`}
                    alt={pet.name}
                    className="img-pet-home"
                  />
                  <div className="box-pets-home">
                    <div className="title-list">
                      <span className="text-list">{pet.name}</span>  (
                      {pet.type})
                    </div>
                    <div className="title-list">
                      <span className="text-list">Breed:</span> {pet.breed}
                    </div>
                    <div className="title-list">
                      <span className="text-list">Age:</span> {pet.age}
                    </div>
                    <div>
                      {pet.available ? (
                        <Link to={`pet/${pet._id}`}>More details</Link>
                      ) : (
                        <p className="text-details">Adopted</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            {pets.length === 0 && (
              <span>
                Doesn't have any pet available to adopt right now. Please, come
                back later!
              </span>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
