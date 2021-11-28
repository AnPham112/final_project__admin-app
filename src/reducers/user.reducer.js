import { userConstants } from "../actions/constants"

const initState = {
  error: null,
  users: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case userConstants.USER_REGISTER_REQUEST:
      state = { ...state }
      break;
    case userConstants.USER_REGISTER_SUCCESS:
      state = { ...state }
      break;
    case userConstants.USER_REGISTER_FAILURE:
      state = { ...state }
      break;

    case userConstants.GET_ALL_USERS_REQUEST:
      state = { ...state }
      break;
    case userConstants.GET_ALL_USERS_SUCCESS:
      state = {
        ...state,
        users: action.payload.users
      }
      break;
    case userConstants.GET_ALL_USERS_FAILURE:
      state = {
        ...state,
        error: action.payload.error
      }
      break;
  }
  return state;
}