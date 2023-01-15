import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { Link } from 'react-router-dom';
import './Adopt.css';

//bootstrap
import { InputGroup, Button, Form } from 'react-bootstrap';

//icon
import { BiSearchAlt2 } from 'react-icons/bi';

const Adopt = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({
    type: [],
    weight: [],
    height: [],
    name: '',
  });
  const [pets, setPets] = useState([]);

  useEffect(() => {
    api.get('/pets').then((response) => {
      setPets(response.data.pets);
    });
  }, []);

  // function handleOnChangeSearch(e) {
  //   setSearch({ [e.target.name]: e.target.value.toLowerCase() });
  // }

  const handleOnClickSearch = async () => {
    const response = await api.get('/pets/search', {
      params: { searchQuery, selectedOptions },
    });
    setPets(response.data.pets);
    console.log(response.data.pets)
  };

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
                  onClick={handleOnClickSearch}
                >
                  <BiSearchAlt2 className="icon" />
                </Button>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  aria-describedby="basic-addon1"
                  onChange={(e) => setSearchQuery(e.target.value)}
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
            />
            <Form.Check
              inline
              label="Type"
              name="type"
              type="checkbox"
              id="inline-checkbox-1"
              value="type"
              onChange={(selected) =>
                setSelectedOptions({ ...selectedOptions, type: selected })
              }
            />
            <Form.Check
              inline
              label="Height"
              name="height"
              type="checkbox"
              id="inline-checkbox-1"
              value="height"
              onChange={(selected) =>
                setSelectedOptions({ ...selectedOptions, height: selected })
              }
            />
            <Form.Check
              inline
              label="Weight"
              name="weight"
              type="checkbox"
              id="inline-checkbox-1"
              value="weight"
              onChange={(selected) =>
                setSelectedOptions({ ...selectedOptions, weight: selected })
              }
            />
            <Form.Check
              inline
              label="Name"
              name="name"
              type="checkbox"
              id="inline-checkbox-1"
              value="name"
              onChange={(selected) =>
                setSelectedOptions({ ...selectedOptions, name: selected })
              }
            />
          </div>
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
