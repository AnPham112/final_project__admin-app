import React from 'react';
import { Form } from 'react-bootstrap';
import './style.css'

const Input = (props) => {
  return (
    <Form.Group>
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
  );
}

export default Input;