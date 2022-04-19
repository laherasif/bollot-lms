import {
  LOGIN_USER,
  ERROR,
  REGISTER_SOCIAL_MEDIA,
  SIGNUP_USER,
  OPT_VERIFY,
  CLEAN_STATE,
  LOGOUT_INST,
} from "../../types/types";
const initialState = {
  token: null,
  isAuth: false,
  varified: false,
  USER: {},
  error: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_USER: {
      return {
        ...state,
        User: action.payload.response.student,
        token: action.payload.response.token.token,
        isAuth: true,
      };
    }
    case OPT_VERIFY: {
      return {
        varified: true,
        isAuth: true,
      };
    }
    case CLEAN_STATE: {
      return {
        User: null,
        token: null,
      };
    }

    case LOGIN_USER: {

      return {
        ...state,
        User: action.payload.response.student,
        token: action.payload.response.token.token,
        isAuth: true,
      };
    }
    case REGISTER_SOCIAL_MEDIA: {
      return {
        ...state,
        User: action.payload.response.student,
        token: action.payload.response.token.token,
        isAuth: true,
      };
    }
    case LOGOUT_INST: {
      return {
        ...state,
        User: null
      }
    }
    case ERROR: {

      return {
        ...state,
        error: action.payload.error,
      };
    }
    default:
      return { ...state };
  }
};

export default userReducer;
