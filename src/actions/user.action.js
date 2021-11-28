import axios from "../helpers/axios";
import { userConstants } from "./constants";
import swal from 'sweetalert2';

export const signup = (user) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });
    const res = await axios.post(`/admin/signup`, { ...user });
    if (res.status === 201) {
      const { message } = res.data;
      dispatch({ type: userConstants.USER_REGISTER_SUCCESS });
      swal.fire({
        icon: 'success',
        title: 'Success!',
        text: message
      });
    } else {
      if (res.status === 400) {
        dispatch({ type: userConstants.USER_REGISTER_FAILURE });
        swal.fire({
          icon: 'error',
          title: 'Failure!',
          text: 'Admin already exists'
        })
      }
    }
  }
}

export const getAllUsers = () => {
  return async (dispatch) => {
    dispatch({ type: userConstants.GET_ALL_USERS_REQUEST });
    const res = await axios.get(`/getAllUsers`);

    if (res.status === 200) {
      dispatch({
        type: userConstants.GET_ALL_USERS_SUCCESS,
        payload: { users: res.data.users }
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: userConstants.USER_REGISTER_FAILURE,
          payload: { error: res.data.error }
        });
      }
    }
  }
}

export const deleteUserById = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.DELETE_USER_BY_ID_REQUEST });
      const res = await axios.delete(`/user/deleteUserById`, {
        data: { payload }
      });
      if (res.status === 202) {
        dispatch({ type: userConstants.DELETE_USER_BY_ID_SUCCESS });
        dispatch(getAllUsers());
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.DELETE_USER_BY_ID_SUCCESS,
          payload: { error }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}