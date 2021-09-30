import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions';
import { Redirect, Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import classnames from 'classnames';
import './style.css';

const Signin = (props) => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    email: yup.string()
      .max(60, 'Email is too long')
      .required('Email is required')
      .email('Enter a valid email'),
    password: yup.string()
      .required('Password is required')
      .max(60, 'Password is too long')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=^.{6,}$)/, 'Password must have at least 6 characters, 1 uppercase character, 1 number')
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const userLogin = (inputValue) => {
    dispatch(login(inputValue));
    reset({
      email: '',
      password: ''
    });
  }

  if (auth.authenticate) {
    return <Redirect to={`/`} />
  }

  return (
    <Layout>
      <div className="signin-container">
        <div className="signin">
          <h1 className="signin-heading">Sign in</h1>
          <form
            autoComplete="off"
            className="signin-form"
            onSubmit={handleSubmit(userLogin)}
          >
            <label htmlFor="email" className="signin-label">Email</label>
            <input
              type='email'
              id='email'
              name='email'
              className={classnames("form-control", "signin-input", { "is-invalid": errors.email })}
              {...register("email")}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email?.message}</div>
            )}
            <label htmlFor="password" className="signin-label">Password</label>
            <input
              type='password'
              id='password'
              name='password'
              className={classnames("form-control", "signin-input", { "is-invalid": errors.password })}
              {...register("password")}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password?.message}</div>
            )}
            <button className="signin-submit">Sign in</button>
          </form>
          <p className="signup-already">
            <span>Have not an account yet?</span>
            <Link to="/signup" className="signup-link">&nbsp;Sign up</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Signin;