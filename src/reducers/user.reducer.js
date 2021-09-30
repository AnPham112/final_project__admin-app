import { userConstants } from "../actions/constants"

const initState = {
  error: null,
  message: '',
  loading: false,
  users: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case userConstants.USER_REGISTER_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break;
    case userConstants.USER_REGISTER_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message
      }
      break;
    case userConstants.USER_REGISTER_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error
      }
      break;

    case userConstants.GET_ALL_USERS_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break;
    case userConstants.GET_ALL_USERS_SUCCESS:
      state = {
        ...state,
        loading: false,
        users: action.payload.users
      }
      break;
    case userConstants.GET_ALL_USERS_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error
      }
      break;
  }
  return state;
}