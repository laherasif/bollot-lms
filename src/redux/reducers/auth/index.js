import {
  LOGIN_USER,
  ERROR,
  REGISTER_SOCIAL_MEDIA,
  SIGNUP_USER,
  OPT_VERIFY,
  CLEAN_STATE,
  LOGOUT_INST,
  UPDATE_USER,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_EMAIL,
} from "../../types/types";
const initialState = {
  token: '',
  isAuth: false,
  varified: false,
  User: {},
  error: {},
  pageNo: 0,
  forgotEmail: ''
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_USER: {
      return {
        ...state,
        User: action.payload.response.student  ,
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
  debugger
      return {
        ...state,
        User: action.payload.response.student || action.payload.response.user,
        token: action.payload.response.token.token,
        isAuth: true,
      };
    }
    // case FORGOT_PASSWORD:
    //   return {
    //     ...state,
    //     pageNo: action.payload

    //   }
    case FORGOT_PASSWORD_EMAIL:
      return {
        ...state,
        forgotEmail: action.payload

      }
    case UPDATE_USER: {

      return {
        ...state,
        User: action.payload.response.user,
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
        User: {},
        token: null
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
