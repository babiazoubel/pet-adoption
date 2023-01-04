import { Form } from 'react-bootstrap';

function Select({ name, options, onChange, value }) {
  return (
    <>
      <Form.Select
        name={name}
        id={name}
        onChange={onChange}
        value={value || ''}
        aria-label="Pet Type"
      >
        <option>Select an option</option>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </Form.Select>
    </>
  );
}

export default Select;
