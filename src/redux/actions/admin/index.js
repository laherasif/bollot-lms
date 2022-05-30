
import {
    LOGIN_ADMIN,
    GET_ALL_INSTRUCTOR,
    GET_ALL_STUDENT,
    DELETE_INS,
    // UPDATE_INT,
    DELETE_STU,
    UPDATE_STU,
    // EDIT_ADD_COURSE,
    // EDIT_CRICCULUM,
    // EDIT_LIVE_CLASSES,
    // EDIT_PREVIEW,
    // EDIT_QUIZ,
    UPDATE_INS,
    LOGOUT_ADMIN,
    GET_COURSE_CATAGORIES,
    GET_ADMIN_DASHBOARD_STAT,
    GET_ADMIN_TRANSACTION_STATICS,
} from '../../types/types'
import instance from '../../../confiq/axios/instance'

// Register User 
export const loginAdmin = (res) => async dispatch => {
    try {
        // let res = await instance.post('api//admin/login', data)
        dispatch({
            type: LOGIN_ADMIN,
            payload: res.data
        })
    } catch (error) {
        console.log("admin error", error)

    }

}


export const logoutAdmin = () => async dispatch => {
    dispatch({
        type: LOGOUT_ADMIN,
    })


}



// Register User 
export const getAllStudent = (data) => async dispatch => {

    try {
        dispatch({
            type: GET_ALL_STUDENT,
            payload: data.response.students
        })
    }
    catch (err) {

    }
}

export const getAllInstructor = (data) => async dispatch => {
    try {

        dispatch({
            type: GET_ALL_INSTRUCTOR,
            payload: data.response.instructors
        })
    }
    catch (err) {

    }
}

export const delStuIns = ({ id, role }) => async (dispatch) => {
    try {
        if (role === "student") {
            dispatch({
                type: DELETE_STU,
                payload: id
            })
        }
        else {
            dispatch({
                type: DELETE_INS,
                payload: id
            })
        }
    }
    catch (err) {

    }
}

export const updateStuIns = ({ role, data }) => async dispatch => {
    debugger

    try {

        if (role === "student") {
            dispatch({
                type: UPDATE_STU,
                payload: data
            })
        }
        else {
            dispatch({
                type: UPDATE_INS,
                payload: data
            })
        }
    }
    catch (err) {

    }
}




export const getCatagories = (data) => dispatch => {
    debugger
    try {
            dispatch({
                type: GET_COURSE_CATAGORIES,
                payload: data 
            })

    }
    catch (err) { }


}

export const getStatistic = (data) => dispatch => {
    debugger
    try {
            dispatch({
                type: GET_ADMIN_DASHBOARD_STAT,
                payload: data 
            })

    }
    catch (err) { }


}


export const getTransaction = (data) => dispatch => {
    debugger
    try {
            dispatch({
                type: GET_ADMIN_TRANSACTION_STATICS,
                payload: data 
            })

    }
    catch (err) { }


}





