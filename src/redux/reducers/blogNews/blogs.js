import {
  GET_BLOGS, GET_NEWS
} from "../../types/types";


const initialState = {

  Blogs: [],
  News: [],
  
};

const BlogReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_BLOGS:
      return{
        ...state,
        Blogs : action.payload 
      }
      case GET_NEWS:
        return{
          ...state ,
          News : action.payload
        }
   

    default:
      return state;
  }
};

export default BlogReducer;
