import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import './PetForm.css';
import Select from '../Select';

const PetForm = ({ petData, handleSubmit, btnText }) => {
  const [pet, setPet] = useState(petData || {});
  const [preview, setPreview] = useState([]);
  const types = ['Dog', 'Cat'];
  const colors = ['White', 'Black', 'Caramel', 'Grey', 'Brown', 'Mixed'];
  const hypoallergenic = ['Yes', 'No'];
  const dietaryRestrictions = ['Yes', 'No'];

  const onFileChange = (e) => {
    setPreview(Array.from(e.target.files));
    setPet({ ...pet, images: [...e.target.files] });
  };

  const handleChange = (e) => {
    setPet({ ...pet, [e.target.name]: e.target.value });
  };

  function handleType(e) {
    setPet({
      ...pet,
      type: e.target.options[e.target.selectedIndex].text,
    });
  }

  function handleColor(e) {
    setPet({
      ...pet,
      color: e.target.options[e.target.selectedIndex].text,
    });
  }

  function handleHypo(e) {
    setPet({
      ...pet,
      hypoallergenic: e.target.options[e.target.selectedIndex].text,
    });
  }

  function handleDiet(e) {
    setPet({
      ...pet,
      dietaryRestrictions: e.target.options[e.target.selectedIndex].text,
    });
  }

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(pet);
  };

  return (
    <>
      <form onSubmit={submit} className="input-container-pet">
        <div className="img-preview-container">
          {preview.length > 0
            ? preview.map((image, index) => (
                <img
                  src={URL.createObjectURL(image)}
                  alt={pet.name}
                  key={`${pet.name}-${index}`}
                  className="img-preview"
                />
              ))
            : pet.images &&
              pet.images.map((image, index) => (
                <img
                  src={`http://localhost:5000/images/pets/${image}`}
                  alt={pet.name}
                  key={`${pet.name}-${index}`}
                  className="img-preview"
                />
              ))}
        </div>
        <InputGroup className="mb-3">
          <Form.Control
            aria-label="Image"
            aria-describedby="basic-addon1"
            name="images"
            type="file"
            onChange={onFileChange}
            multiple={true}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Type</InputGroup.Text>
          <Select
            name="type"
            options={types}
            onChange={handleType}
            value={pet.type || ''}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
          <Form.Control
            placeholder="Pet Name"
            aria-label="Name"
            aria-describedby="basic-addon1"
            name="name"
            type="name"
            onChange={handleChange}
            value={pet.name || ''}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Age</InputGroup.Text>
          <Form.Control
            placeholder="Pet Age"
            aria-label="Age"
            aria-describedby="basic-addon1"
            name="age"
            type="text"
            onChange={handleChange}
            value={pet.age || ''}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Weight</InputGroup.Text>
          <Form.Control
            placeholder="Pet Weight"
            aria-label="Weight"
            aria-describedby="basic-addon1"
            name="weight"
            type="text"
            onChange={handleChange}
            value={pet.weight || ''}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Height</InputGroup.Text>
          <Form.Control
            placeholder="Pet Height"
            aria-label="Height"
            aria-describedby="basic-addon1"
            name="height"
            type="text"
            onChange={handleChange}
            value={pet.height || ''}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Color</InputGroup.Text>
          <Select
            name="type"
            options={colors}
            onChange={handleColor}
            value={pet.color || ''}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Breed</InputGroup.Text>
          <Form.Control
            placeholder="Pet Breed"
            aria-label="Breed"
            aria-describedby="basic-addon1"
            name="breed"
            type="text"
            onChange={handleChange}
            value={pet.breed || ''}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Hypoallergenic</InputGroup.Text>
          <Select
            name="type"
            options={hypoallergenic}
            onChange={handleHypo}
            value={pet.hypoallergenic || ''}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            Dietary Restrictions
          </InputGroup.Text>
          <Select
            name="type"
            options={dietaryRestrictions}
            onChange={handleDiet}
            value={pet.dietaryRestrictions || ''}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Bio</InputGroup.Text>
          <Form.Control
            placeholder="Tell us more about your pet"
            aria-label="Bio"
            aria-describedby="basic-addon1"
            as="textarea"
            name="bio"
            onChange={handleChange}
            value={pet.bio || ''}
          />
        </InputGroup>
        <input type='submit' value={btnText} className='button'/>
      </form>
    </>
  );
};

export default PetForm;
