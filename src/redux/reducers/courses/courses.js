import {
  GET_CATAGORY,
  GET_FETAURE,
  GET_LATEST,
  GET_BY_CATAGORY,
  GET_SORTED_COURSE,
  GET_SEARCH_COURSE,
  GET_BY_CATAGORY_COURSE
} from "../../types/types";
import {
  REG_CART,
  GET_CART,
  GET_FILTER_PRICE,
  GET_ALL_COURSES,
  DELETE_CART,
  UPDATE_CART_QUANTITY_CLIENT,
  INCREMENT,
  GET_BY_CATAGORY_FEATURE,
  DECREMENT,
  INSERT_LOCAL_DATA,
  FETCH_LOCAL_DATA,
  FILTER_CART_BY_CATA,
} from "../../types/types";

const initialState = {
  Catagory: [],
  Latest: [],
  Feature: [],
  AllCourse: [],
  loader : false , 
};

const CourseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COURSES:

      return {
        ...state,
        AllCourse: action.payload,
      };

    case GET_CATAGORY:

      return {
        ...state,
        Catagory: action.payload,
        loader : false
      };

    case GET_FETAURE:

      return {
        ...state,
        Feature: action.payload,
        loader : false

      };

    case GET_LATEST:

      return {
        ...state,
        Latest: action.payload,
        loader : false , 
      };

    case GET_BY_CATAGORY:

      return {
        ...state,
        AllCourse: action.payload,
        loader : false

      };

    case GET_BY_CATAGORY_FEATURE:
      // debugger
      return {
        ...state,
        Feature: action.payload,
        loader : false

      };


    case GET_BY_CATAGORY_COURSE:
      return {
        ...state,
        AllCourse: action.payload,
        loader : false

      };

    case GET_SEARCH_COURSE:

      return {
        ...state,
        AllCourse: action.payload,
        loader : false

      };
    case GET_FILTER_PRICE:

      return {
        ...state,
        AllCourse: action.payload,
        loader : false

      };

    case GET_SORTED_COURSE:

      return {
        ...state,
        AllCourse: action.payload,
        loader : false

      };

   
    
    default:
      return state;
  }
};

export default CourseReducer;
