
import {
    GET_COURSES,
    GET_COURSES_SEARCH,
    GET_DASHBOARD_STATE,
    GET_STUDENT_PAYMENT,
    GET_STUDENT_TRANSACTION
} from '../../types/types'


export const getDashboardStatic = (data) => async (dispatch) => {
    debugger
    dispatch({
        type: GET_DASHBOARD_STATE,
        payload: data,
    })
}
export const getPayemnts = (data) => async (dispatch) => {
    debugger
    dispatch({
        type: GET_STUDENT_PAYMENT,
        payload: data,
    })
}
export const getTransactions = (data) => async (dispatch) => {
    debugger
    dispatch({
        type: GET_STUDENT_TRANSACTION,
        payload: data,
    })
}



export const getCourses = (data) => async (dispatch) => {
    debugger
    dispatch({
        type: GET_COURSES,
        payload: data,
    })
}


export const getSearchCourses = (data) => async (dispatch) => {
    debugger
    dispatch({
        type: GET_COURSES_SEARCH,
        payload: data,
    })
}




