
import {
  LOGIN_ADMIN, LOGOUT_ADMIN, GET_ALL_INSTRUCTOR, GET_ALL_STUDENT, DELETE_STU, DELETE_INS, UPDATE_STU, UPDATE_INS, GET_COURSE_CATAGORIES
} from "../../types/types";

const initialState = {
  Admin: {},
  token: "",
  Students: [],
  Instructor: [],
  Catagories: []

};

const AdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ADMIN:
      debugger
      return {
        ...state,
        Admin: action.payload.response.admin,
        token: action.payload.response.token.token,
        isAuth: true,
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
    case GET_COURSE_CATAGORIES:
      return {
        ...state,
        Catagories: action.payload
      }

    case DELETE_STU:
      let find = state.Students.filter((f) => f.id !== action.payload)

      return {
        ...state,
        Students: find,
      };

    case DELETE_INS:

      let findIns = state.Instructor.filter((f) => f.id !== action.payload)

      return {
        ...state,
        Instructor: findIns,
      };
    case UPDATE_STU:
      debugger

      // let NewData = state.Students.filter(item => {
      //   if (item.id === action.payload.id);
      //   NewData.unshift(action.payload)

      // })


      return {
        ...state,
        Students: state.Students.map(
          (content, i) => i === action.payload.id ? { ...content, content: action.payload }
            : content
        ),

      };
    case UPDATE_INS:
      debugger

      // let NewDatas = state.Instructor.filter(item => {
      //   if (item.id === action.payload.id) {
      //     item = action.payload
      //   }
      //   return item
      //   // NewData.unshift(action.payload)

      // })
      return {
        ...state,
        Instructor: state.Instructor.map(
          (content, i) => i === action.payload.id ? { ...content, content: action.payload }
            : content
        ),

      };

    case LOGOUT_ADMIN:
      debugger
      return {
        ...state,
        Admin: null,
        token: null
      }


    default:
      return state;
  }
};

export default AdminReducer;
