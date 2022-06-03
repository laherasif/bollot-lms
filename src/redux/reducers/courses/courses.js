import {
  LOADING,
  GET_CATAGORY,
  GET_FETAURE,
  GET_LATEST,
  GET_BY_CATAGORY,
  GET_SORTED_COURSE,
  GET_SEARCH_COURSE,
  GET_BY_CATAGORY_COURSE,
  GET_BY_CATAGORY_FEATURE,
  GET_ALL_COURSES,
  LIVE_COURSE,
  GET_FILTER_PRICE,
  GET_MEMERSHIP,

  GET_COURSE_CRICULUM,
  GET_SORTED_COURSE_SEARCH,
  GET_FILTER_LIVE_COURSE,
} from "../../types/types";


const initialState = {
  Catagory: [],
  Latest: [],
  Feature: [],
  AllCourse: [],
  Criculum: [],
  MemberShip: [],
  loaders: false,
};

const CourseReducer = (state = initialState, action) => {
  switch (action.type) {


    case LOADING:
      return {
        ...state,
        loaders: action.payload
      }


    case GET_COURSE_CRICULUM:
      return {
        ...state,
        Criculum: action.payload
      }





    case GET_ALL_COURSES:

      return {
        ...state,
        AllCourse: action.payload,
      };

    case GET_CATAGORY:

      return {
        ...state,
        Catagory: action.payload,
        loader: false
      };

    case GET_FETAURE:

      return {
        ...state,
        Feature: action.payload,
        loader: false

      };

    case GET_LATEST:

      return {
        ...state,
        Latest: action.payload,
        loader: false,
      };

    case GET_BY_CATAGORY:

      return {
        ...state,
        AllCourse: action.payload,
        loader: false

      };

    case GET_BY_CATAGORY_FEATURE:
      // debugger
      return {
        ...state,
        Feature: action.payload,
        loader: false

      };


    case GET_BY_CATAGORY_COURSE:
      return {
        ...state,
        AllCourse: action.payload,
        loader: false

      };

    case GET_SORTED_COURSE_SEARCH:
      debugger
      return {
        ...state,
        AllCourse: action.payload,

      };

    case GET_SEARCH_COURSE:

      return {
        ...state,
        AllCourse: action.payload,
        loader: false

      };
    case GET_FILTER_PRICE:

      return {
        ...state,
        AllCourse: action.payload,
        loader: false

      };

    case GET_SORTED_COURSE:
      debugger
      return {
        ...state,
        AllCourse: action.payload,
        loader: false

      };
    case LIVE_COURSE:
      debugger
      return {
        ...state,
        LiveCouse: action.payload
      }
    case GET_FILTER_LIVE_COURSE:
      return {
        ...state,
        AllCourse: action.payload,

      }

    case GET_MEMERSHIP:
      return {
        ...state,
        MemberShip: action.payload
      }

    // case INCREMENT:
    //   state.localD[state.localD.findIndex((item) => item._id === action.id)]
    //     .Quantity++;

    //   localStorage.setItem("carts", JSON.stringify(state.localD));

    //   return {
    //     ...state,
    //     localD: [...state.localD],
    //   };

    // case DECREMENT:
    //   state.localD[state.localD.findIndex((item) => item._id === action.id)]
    //     .Quantity--;

    //   localStorage.setItem("carts", JSON.stringify(state.localD));
    //   return {
    //     ...state,
    //     localD: [...state.localD],
    //   };


    default:
      return state;
  }
};

export default CourseReducer;
