
import {
  LOGIN_ADMIN, LOGOUT_ADMIN,
  GET_ALL_INSTRUCTOR,
  GET_ADMIN_DASHBOARD_STAT,
  GET_ALL_STUDENT,
  DELETE_STU, DELETE_INS,
  UPDATE_STU, UPDATE_INS,
  GET_COURSE_CATAGORIES,
  GET_ADMIN_TRANSACTION_STATICS,
  ADD_CATAGORY,
  DEL_CATEGORY,
  UPDATE_CATEGORY,
  ADD_MEMBERSHIP,
  GET_MEMBERSHIP,
  DEL_MEMBERSHIP,
  UPDATE_MEMBERSHIP,
  UPDATE_ADMIN,
} from "../../types/types";

const initialState = {
  Admin: {},
  token: "",
  Statistic: {},
  Transaction: {},
  Students: [],
  Instructor: [],
  Catagories: [],
  AllCourses: [],
  LiveCourses: [],
  Coupons: [],
  Blogs: [],
  News: [],
  MemberShips: [],



};

const AdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ADMIN:
      
      return {
        ...state,
        Admin: action.payload.response.user || action.payload.response.admin,
        token: action.payload.response.token.token,
        isAuth: true,
      };

    case UPDATE_ADMIN: {
      
      return {
        ...state,
        Admin: action.payload.response.user,
      };
    }

    case GET_ADMIN_DASHBOARD_STAT:
      return {
        ...state,
        Statistic: action.payload
      }
    case GET_ADMIN_TRANSACTION_STATICS:
      return {
        ...state,
        Transaction: action.payload
      }

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
    case ADD_CATAGORY:
      
      return {
        ...state,
        Catagories: [...state.Catagories, action.payload]
      }
    case GET_COURSE_CATAGORIES:
      return {
        ...state,
        Catagories: action.payload
      }

    case DEL_CATEGORY:
      let findCategory = state.Catagories.filter((cata) => cata.id !== action.payload)
      return {
        ...state,
        Catagories: findCategory
      }
    case UPDATE_CATEGORY:
      return {
        ...state,
        Catagories: state.Catagories.map(
          (content, i) => i === action.payload.id ? { ...content, content: action.payload }
            : content
        ),
      }


    case GET_MEMBERSHIP:
      
      return {
        ...state,
        MemberShips: action.payload
      }
    case ADD_MEMBERSHIP:
      
      return {
        ...state,
        MemberShips: [action.payload]
      }
    case DEL_MEMBERSHIP:
      
      let findMember = state.MemberShips.filter((cata) => cata.id !== action.payload)

      return {
        ...state,
        MemberShips: findMember
      }
    case UPDATE_MEMBERSHIP:
      

      return {
        ...state,
        MemberShips: state.MemberShips.map((item) => item.id === action.payload.id ? { ...item, item: action.payload } : item),
      }
    // return {
    //   ...state,
    //   MemberShips: state.MemberShips.map(
    //     (content) => content.id === 10 ? { ...content, content: action.payload }
    //       : content
    //   ),
    // }

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
      return {
        ...state,
        Students: state.Students.map(
          (content, i) => content.id === action.payload.id ? { ...content, content: action.payload }
            : content
        ),

      };
    case UPDATE_INS:

      return {
        ...state,
        Instructor: state.Instructor.map(
          (content, i) => content.id === action.payload.id ? { ...content, content: action.payload }
            : content
        ),

      };

    case LOGOUT_ADMIN:

      return {
        ...state,
        Admin: {},
        token: null
      }


    default:
      return state;
  }
};

export default AdminReducer;
