import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import { Grid } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { signup } from '../../actions/user.action';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import classnames from 'classnames';
import './style.css';

const Signup = (props) => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    firstName: yup.string()
      .max(20, 'First name is too long')
      .required('First name is required'),
    lastName: yup.string()
      .max(20, 'Last name is too long')
      .required('Last name is required'),
    email: yup.string()
      .max(60, 'Email is too long')
      .required('Email is required')
      .email('Enter a valid email'),
    password: yup.string()
      .required('Password is required')
      .max(60, 'Password is too long')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=^.{6,}$)/, 'Password must have at least 6 characters, 1 uppercase character, 1 number'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], 'Password must match')
      .required('Confirm password is required')
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const userSignup = (inputValue) => {
    dispatch(signup(inputValue));
    reset({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  }

  if (auth.authenticate) {
    return <Redirect to={`/`} />
  }

  return (
    <Layout>
      <div className="signup-container">
        <div className="signup">
          <h1 className="signup-heading">Sign up</h1>
          <form
            onSubmit={handleSubmit(userSignup)}
            className="signup-form"
            autoComplete="off"
          >
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <label htmlFor="firstName" className="signup-label">First name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className={classnames("form-control", "signup-input", { "is-invalid": errors.firstName })}
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName?.message}</div>
                )}
              </Grid>

              <Grid item sm={6} xs={12}>
                <label htmlFor="lastName" className="signup-label">Last name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className={classnames("form-control", "signup-input", { "is-invalid": errors.lastName })}
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName?.message}</div>
                )}
              </Grid>

              <Grid item sm={12} xs={12}>
                <label htmlFor="email" className="signup-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={classnames("form-control", "signup-input", { "is-invalid": errors.email })}
                  {...register("email")}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email?.message}</div>
                )}
              </Grid>
              <Grid item sm={12} xs={12}>
                <label htmlFor="password" className="signup-label">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={classnames("form-control", "signup-input", { "is-invalid": errors.password })}
                  {...register("password")}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password?.message}</div>
                )}
              </Grid>
              <Grid item sm={12} xs={12}>
                <label htmlFor="confirmPassword" className="signup-label">Confirm password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className={classnames("form-control", "signup-input", { "is-invalid": errors.confirmPassword })}
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                )}
              </Grid>
              <Grid item sm={12} xs={12}>
                <button className="signup-submit">Sign up</button>
              </Grid>
            </Grid>
          </form>
          <p className="signup-already">
            <span>Already have an account?</span>
            <Link to="/signin" className="login-link">&nbsp;Login</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Signup;