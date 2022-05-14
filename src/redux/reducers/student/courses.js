import {
    GET_COURSES,
    GET_COURSES_SEARCH,
  } from "../../types/types";
  
  
  const initialState = {

    Courses: [],
    SearchCourse :[]
  
  };
  
  const CourseReducer = (state = initialState, action) => {
    switch (action.type) {
  
  
    
      case GET_COURSES:
  
        return {
          ...state,
          Courses: action.payload,
        };

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
  