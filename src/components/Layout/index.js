import React from 'react'
import Header from '../Header';
import { Container, Col, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './style.css';

const Layout = (props) => {
  return (
    <>
      <Header />
      {props.sidebar ?
        <Container fluid>
          <Row>
            <Col md={2} xs={3} className="sidebar">
              <ul>
                <li><NavLink exact to={`/`}>Home</NavLink></li>
                <li><NavLink to={`/category`}>Category</NavLink></li>
                <li><NavLink to={`/products`}>Products</NavLink></li>
                <li><NavLink to={`/orders`}>Orders</NavLink></li>
              </ul>
            </Col>

            <Col md={10} className="admin-container">
              {props.children}
            </Col>
          </Row>
        </Container>
        : props.children
      }
    </>
  );
}

export default Layout;