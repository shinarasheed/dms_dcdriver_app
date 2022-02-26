// import {
//   REGISTER_SUCCESS,
//   REGISTER_REQUEST,
//   REGISTER_FAIL,
//   LOGIN_REQUEST,
//   LOGIN_SUCCESS,
//   LOGIN_FAIL,
//   LOGOUT,
//   RESTORE_TOKEN,
// } from "../constants/userConstants";

// const initialState = {
//   token: null,
//   isAuthenticated: false,
//   isLoading: false,
//   user: null,
//   message: "",
//   error: null,
//   driverEmail: null,
// };

// export default (state = initialState, action) => {
//   switch (action.type) {
//     case LOGIN_REQUEST:
//       return {
//         ...state,
//         isLoading: true,
//       };

//     case LOGIN_SUCCESS:
//       return {
//         ...state,
//         isAuthenticated: true,
//         isLoading: false,
//         token: action.payload.token,
//         user: action.payload.user,
//       };

//     case REGISTER_REQUEST:
//       return {
//         ...state,
//         isLoading: true,
//       };
//     case REGISTER_SUCCESS:
//       return {
//         ...state,
//         isAuthenticated: false,
//         isLoading: false,
//         // driverEmail: action.payload,
//       };
//     case LOGIN_FAIL:
//       return {
//         ...state,
//         user: null,
//         isAuthenticated: false,
//         isLoading: false,
//         error: action.payload,
//       };

//     case REGISTER_FAIL:
//       return {
//         ...state,
//         user: null,
//         isAuthenticated: false,
//         isLoading: false,
//         error: action.payload,
//       };

//     case RESTORE_TOKEN:
//       return {
//         ...state,
//         isLoading: false,
//         isAuthenticated: true,
//         token: action.payload,
//       };

//     case LOGOUT:
//       return {
//         ...state,
//         isLoading: false,
//         isAuthenticated: false,
//         token: null,
//         user: null,
//       };

//     default:
//       return state;
//   }
// };

import {
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  RESTORE_TOKEN,
} from "../constants/userConstants";

const initialState = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
  user: null,
  message: "",
  error: null,
  // driverEmail: null,
  phoneNumber: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
      };

    case REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        phoneNumber: action.payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };

    case REGISTER_FAIL:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };

    case RESTORE_TOKEN:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        token: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        token: null,
        user: null,
      };

    default:
      return state;
  }
};
