import axios from "../helpers/axios";
import { authConstants } from "./constants"
import swal from 'sweetalert2';

export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    try {
      const res = await axios.post(`/admin/signin`, { ...user });
      if (res.status === 200) {
        const { token, user } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: { token, user }
        });
        swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Login successfully'
        })
      }
    } catch (error) {
      const { message } = error.response.data;
      dispatch({ type: authConstants.LOGIN_FAILURE });
      swal.fire({
        icon: 'error',
        title: 'Failure!',
        text: message
      });
    }
  }
}

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = JSON.parse(localStorage.getItem('user'));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: { token, user }
      });
    }
    else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: 'Failed to login' }
      });
    }
  }
}

export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });
    const res = await axios.post(`/admin/signout`);
    if (res.status === 200) {
      localStorage.clear();
      dispatch({ type: authConstants.LOGOUT_SUCCESS })
    } else {
      dispatch({
        type: authConstants.LOGOUT_FAILURE,
        payload: { error: res.data.error }
      });
    }
  }
}