import React, { useContext, useEffect, useState } from 'react';
import api from '../../utils/api';
import { Link } from 'react-router-dom';
import './Home.css';
import Register from '../../modals/Register/Register';

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
                Hello,
                <span className="name-home">
                  {user.name} {user.lastName}
                </span>
                !
              </div>
            )}
            <div className="title">Welcome to Mutt Lovers</div>
            <div className="sub-title">Adopt your next best friend</div>

            <div className="text">
              The ultimate online platform for all pet adoption enthusiasts! Our
              website is dedicated to helping homeless animals find loving and
              caring homes. We believe that every animal deserves a second
              chance at happiness, and through our extensive network of
              shelters, rescues, and foster homes, we strive to connect these
              deserving pets with their perfect forever families. Whether you
              are a first-time pet owner or a seasoned animal lover, Mutt Lovers
              offers a user-friendly and comprehensive experience that is
              designed to make the adoption process as easy and enjoyable as
              possible.
            </div>
            {!authenticated && (
              <>
                <div className="text">
                  Join us today and find your new furry best friend!
                </div>
                <Register />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
