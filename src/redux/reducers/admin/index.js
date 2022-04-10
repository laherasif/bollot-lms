
import {
  LOGIN_ADMIN, GET_ALL_INSTRUCTOR, GET_ALL_STUDENT, DELETE_STU , DELETE_INS , UPDATE_STU , UPDATE_INS
} from "../../types/types";

const initialState = {
  Admin: {},
  Students: [],
  Instructor: [],

};

const AdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ADMIN:
    
      return {
        ...state,
        Admin: action.payload,
      };

    case GET_ALL_INSTRUCTOR:
    
      return {
        ...state,
        Instructor: action.payload,
      };

    case GET_ALL_STUDENT:
    
      return {
        ...state,
        Students: action.payload,
      };

    case DELETE_STU:
    
      return {
        ...state,
        Students: action.payload,
      };

    case DELETE_INS:
      return {
        ...state,
        Instructor: action.payload,
      };
    case UPDATE_STU:
      return {
        ...state,
        Students: action.payload,

      };
    case UPDATE_INS:
      return {
        ...state,
        Instructor: action.payload,

      };


    default:
      return state;
  }
};

export default AdminReducer;
