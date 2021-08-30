import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';

import { signup } from '../../actions/user.action';
import Layout from '../../components/Layout';
import './style.css';

const Signup = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.loading) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    }
  }, [user.loading]);

  if (auth.authenticate) {
    return <Redirect to={`/`} />
  }

  const userSignup = (e) => {
    e.preventDefault();
    const user = { firstName, lastName, email, password }
    dispatch(signup(user));
  }

  if (user.loading) {
    return <p>Loading...!</p>
  }

  return (
    <Layout>
      <div className="signup-container">
        {user.message}
        <div className="signup">
          <h1 className="signup-heading">
            Sign up
          </h1>
          <form
            onSubmit={userSignup}
            className="signup-form"
            autoComplete="off"
          >
            <div className="signup-grid">
              <div className="grid__row">
                <div className="grid__column-6">
                  <label htmlFor="firstName" className="signup-label">First name</label>
                  <input
                    type="text"
                    id="firstName"
                    className="signup-input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  {/* <p className='err-message'>error</p> */}
                </div>
                <div className="grid__column-6">
                  <label htmlFor="lastName" className="signup-label">Last name</label>
                  <input
                    type="text"
                    id="lastName"
                    className="signup-input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  {/* <p className='err-message'>error</p> */}
                </div>
              </div>
            </div>
            <label htmlFor="email" className="signup-label">Email</label>
            <input
              type="email"
              id="email"
              className="signup-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* <p className='err-message'>error</p> */}
            <label htmlFor="password" className="signup-label">Password</label>
            <input
              type="password"
              id="password"
              className="signup-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <p className='err-message'>error</p> */}
            <button className="signup-submit">Sign up</button>
          </form>
          <p class="signup-already">
            <span>Already have an account?</span>
            <NavLink to="/signin" class="signup-login-link">&nbsp;Login</NavLink>
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Signup;