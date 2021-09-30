import axios from "../helpers/axios";
import { authConstants } from "./constants"
import swal from 'sweetalert2';

export const login = (inputValue) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    try {
      const res = await axios.post(`/admin/signin`, { ...inputValue });
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
      } else {
        if (res.status === 400) {
          const { message } = res.data;
          dispatch({
            type: authConstants.LOGIN_FAILURE,
            payload: { message }
          });
        }
      }
    } catch (error) {
      swal.fire({
        icon: 'error',
        title: 'Failure!',
        text: error.response.data.message
      })
    }
  }
}

export const isUserLoggedIn = () => {
  return async dispatch => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = JSON.parse(localStorage.getItem('user'));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: { token, user }
      });
    }
    // else {
    //   dispatch({
    //     type: authConstants.LOGIN_FAILURE,
    //     payload: { error: 'Login failed' }
    //   });
    // }
  }
}

export const signout = () => {
  return async dispatch => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });
    const res = await axios.post(`/admin/signout`);

    if (res.status === 200) {
      localStorage.clear();
      dispatch({
        type: authConstants.LOGOUT_SUCCESS
      })
    } else {
      dispatch({
        type: authConstants.LOGOUT_FAILURE,
        payload: { error: res.data.error }
      });
    }
  }
}