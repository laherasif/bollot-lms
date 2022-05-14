
import {
    GET_COURSES,
    GET_COURSES_SEARCH
} from '../../types/types'



export const getCourses = ( data) => async (dispatch) => {
    debugger
    dispatch({
        type : GET_COURSES,
        payload : data,
    })
}


export const getSearchCourses = (data) => async (dispatch) => {
    debugger
    dispatch({
        type : GET_COURSES_SEARCH,
        payload : data,
    })
}
