import React from 'react';
import { Form } from 'react-bootstrap';
import './style.css';

const Select = (props) => {
  return (
    <Form.Group className="form-group__select">
      {props.label && <Form.Label>{props.label}</Form.Label>}
      <select className="form-select" value={props.value} onChange={props.onChange}>
        <option value="" className="select-placeholder">---{props.placeholder}---</option>
        {
          props.options.length > 0 ?
            props.options.map((option, index) =>
              <option key={index} value={option.value}>
                {option.name}
              </option>
            ) : null
        }
      </select>
    </Form.Group>
  );
}

export default Select;

