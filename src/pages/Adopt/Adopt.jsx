import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { Link } from 'react-router-dom';
import './Adopt.css';

//bootstrap
import { InputGroup, Button, Form } from 'react-bootstrap';

//icon
import { BiSearchAlt2 } from 'react-icons/bi';

const Adopt = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [handleCheck, setHandleCheck] = useState({});
  const [pets, setPets] = useState([]);

  useEffect(() => {
    api
      .get(`/pets`)
      .then((response) => {
        setPets(response.data.pets);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleOnChangeSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChangeCheck = (e) => {
    setHandleCheck({ ...handleCheck, [e.target.name]: e.target.value })
  }

  // const handleOnClickSearch = (e) => {
  //   e.preventDefault();
  //   api
  //     .get('/pets', { params: { name: searchTerm } })
  //     .then((res) => setPets(res.data))
  //     .catch((err) => console.log(err));
  // };

  return (
    <>
      <div className="container-pets-adopt">
        <div className="title-pet">Adopt a Pet</div>
        <div className="sub-title-pet">Look at our cute pets available</div>
        <div className="text-pet">
          Click on the one you liked the most, see more details and get in touch
          with its tutor.
        </div>
        <div className="box-search">
          <div className="text-pet">Looking for a specific pet?</div>
          <div>
            <Form>
              <InputGroup className="d-flex">
                <Button
                  variant="light"
                  id="button-addon1"
                  // onClick={handleOnClickSearch}
                >
                  <BiSearchAlt2 className="icon" />
                </Button>
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  aria-describedby="basic-addon1"
                  value={searchTerm}
                  onChange={handleOnChangeSearch}
                />
              </InputGroup>
            </Form>
          </div>
          <div className="text-pet">
            <Form.Check
              inline
              label="Adoption Status"
              name="adoption"
              type="checkbox"
              id="inline-checkbox-1"
              value="adoption"
              onChange={handleChangeCheck}
            />
            <Form.Check
              inline
              label="Type"
              name="type"
              type="checkbox"
              id="inline-checkbox-1"
              value="type"
              onChange={handleChangeCheck}
            />
            <Form.Check
              inline
              label="Height"
              name="height"
              type="checkbox"
              id="inline-checkbox-1"
              value="height"
              onChange={handleChangeCheck}
            />
            <Form.Check
              inline
              label="Weight"
              name="weight"
              type="checkbox"
              id="inline-checkbox-1"
              value="weight"
              onChange={handleChangeCheck}
            />
            <Form.Check
              inline
              label="Name"
              name="name"
              type="checkbox"
              id="inline-checkbox-1"
              value="name"
              onChange={handleChangeCheck}
            />
          </div>
        </div>
      </div>
      <div className="center-list">
        <div className="box-all-home">
          {pets.length > 0 &&
            pets
              .filter((val) => {
                if (searchTerm === '') {
                  return val;
                } else if (
                  val.name.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((pet) => (
                <div key={pet._id} className="pet-box">
                  <img
                    src={`http://localhost:5000/images/pets/${pet.images[0]}`}
                    alt={pet.name}
                    className="img-pet-home"
                  />
                  <div className="box-pets-home">
                    <div className="title-list">
                      <span className="text-list">{pet.name}</span> ({pet.type})
                    </div>
                    <div className="title-list">
                      <span className="text-list">Breed:</span> {pet.breed}
                    </div>
                    <div className="title-list">
                      <span className="text-list">Height:</span> {pet.height}cm
                    </div>
                    <div className="title-list">
                      <span className="text-list">Weight:</span> {pet.weight}kg
                    </div>
                    <div>
                      {pet.available ? (
                        <Link to={`pet/${pet._id}`}>More details</Link>
                      ) : (
                        <p className="text-list-adopted">Adopted</p>
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
    </>
  );
};

export default Adopt;
