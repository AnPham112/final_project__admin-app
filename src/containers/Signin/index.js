import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import { login } from '../../actions';
import { Redirect } from 'react-router-dom';



const Signin = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const userLogin = (e) => {
    e.preventDefault();
    const user = { email, password }
    dispatch(login(user));
  }

  if (auth.authenticate) {
    return <Redirect to={`/`} />
  }

  return (
    <div className="signin-container">
      <div className="signin">
        <h1 className="signin-heading">
          Sign in
        </h1>
        <form onSubmit={userLogin} className="signin-form" autoComplete="off">
          <label htmlFor="email" className="signin-label">Email</label>
          <input
            type="text"
            id="email"
            className="signin-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <p className='err-message'>error</p> */}
          <label htmlFor="password" className="signin-label">Password</label>
          <input
            type="password"
            id="password"
            className="signin-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <p className='err-message'>error</p> */}
          <button className="signin-submit">Sign in</button>
        </form>
      </div>
    </div>
  );
}

export default Signin;