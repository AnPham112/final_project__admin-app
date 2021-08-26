import React from 'react';
import { Form } from 'react-bootstrap';
import './style.css'

const Input = (props) => {
  let input = null;
  switch (props.type) {
    case 'select':
      input = <Form.Group className="form-group__select">
        {props.label && <Form.Label>{props.label}</Form.Label>}
        <select
          className="form-select"
          value={props.value}
          onChange={props.onChange}
        >
          <option value="">{props.placeholder}</option>
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
      break;
    case 'text':
    default:
      input = <Form.Group>
        {props.label && <Form.Label>{props.label}</Form.Label>}
        <Form.Control
          className="form__input"
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        />
        <Form.Text className="err-message">
          {props.errorMessage}
        </Form.Text>
      </Form.Group>
  }
  return input;
}

export default Input;