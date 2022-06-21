import {
  GET_COURSES,
  GET_COURSES_SEARCH,
  GET_DASHBOARD_STATE,
  GET_STUDENT_PAYMENT,
  GET_STUDENT_TRANSACTION,
  GET_COURSE_LECTURE,

} from "../../types/types";


const initialState = {
  Dashboard: {},
  Payment: {},
  Tranaction: [],
  Courses: [],
  Lectures:{},
  SearchCourse: [],

};

const CourseReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_DASHBOARD_STATE:
      return {
        ...state,
        Dashboard: action.payload
      }

    case GET_STUDENT_PAYMENT:
      return {
        ...state,
        Payment: action.payload
      }

    case GET_STUDENT_TRANSACTION:
      return {
        ...state,
        Tranaction: action.payload

      }

    case GET_COURSES:

      return {
        ...state,
        Courses: action.payload,
      };

    case GET_COURSE_LECTURE:
      return {
        ...state,
        Lectures: action.payload
      }

    case GET_COURSES_SEARCH:
      return {
        ...state,
        SearchCourse: action.payload,
      };


    default:
      return state;
  }
};

export default CourseReducer;
