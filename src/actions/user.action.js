import axios from "../helpers/axios";
import { userConstants } from "./constants";
import swal from 'sweetalert2';

export const signup = (inputValue) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });
    try {
      const res = await axios.post(`/admin/signup`, { ...inputValue });
      if (res.status === 201) {
        const { message } = res.data;
        dispatch({
          type: userConstants.USER_REGISTER_SUCCESS,
          payload: { message }
        });
        swal.fire({
          icon: 'success',
          title: 'Success!',
          text: res.data.message
        });
      } else {
        if (res.status === 400) {
          const { error } = res.data;
          dispatch({
            type: userConstants.USER_REGISTER_FAILURE,
            payload: { error }
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