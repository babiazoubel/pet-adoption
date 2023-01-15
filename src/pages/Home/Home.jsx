import React, { useContext, useEffect, useState } from 'react';
import api from '../../utils/api';
import { Link } from 'react-router-dom';
import './Home.css';

import { AuthContext } from '../../contexts/AuthContext';

const Home = () => {
  const imgPet = require('../../assets/dog-bg2.png');

  const [user, setUser] = useState({});
  const { authenticated } = useContext(AuthContext);
  const [token] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (!token) return;
    api
      .get('/users/checkuser', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      });
  }, [token]);

  return (
    <>
      <section>
        <div className="container-home">
          <div>
            <img src={imgPet} alt="dog" className="img-dog" />
          </div>
          <div className="title-box">
            {authenticated && (
              <div className="text">
                Hello,{' '}
                <span className="name-home">
                  {user.name} {user.lastName}
                </span>
                !
              </div>
            )}
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
    </>
  );
};

export default Home;
