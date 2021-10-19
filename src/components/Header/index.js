import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link, Redirect } from 'react-router-dom';
import Logo from '../../images/logo.png';
import { signout } from '../../actions';
import './style.css';
const Header = (props) => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signout());
    return <Redirect to={`/`} />
  }

  const renderLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
          <span
            className="nav-link"
            onClick={logout}
          >
            Logout
          </span>
        </li>
      </Nav>
    );
  }

  const renderNonLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item"><NavLink to="/signin" className="nav-link">Signin</NavLink></li>
        <li className="nav-item"><NavLink to="/signup" className="nav-link">Signup</NavLink></li>
      </Nav>
    );
  }

  return (
    <Navbar collapseOnSelect fixed="top" expand="lg" className="admin-navbar">
      <Container fluid>
        <Link to="/" className="navbar-brand">
          <img src={Logo} alt='' />
        </Link>
        {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
      </Container>
    </Navbar>
  );
}

export default Header;