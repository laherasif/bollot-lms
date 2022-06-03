
import {
    LOGIN_ADMIN,
    GET_ALL_INSTRUCTOR,
    GET_ALL_STUDENT,
    DELETE_INS,
    DELETE_STU,
    UPDATE_STU,
    ADD_CATAGORY,
    DEL_CATEGORY,
    UPDATE_CATEGORY,
    UPDATE_INS,
    LOGOUT_ADMIN,
    UPDATE_ADMIN,
    GET_COURSE_CATAGORIES,
    GET_ADMIN_DASHBOARD_STAT,
    GET_ADMIN_TRANSACTION_STATICS,
    // GET_LIVE_COURSES,
    GET_COURSES,
    DEL_MEMBERSHIP,
    ADD_MEMBERSHIP,
    UPDATE_MEMBERSHIP,
    GET_MEMBERSHIP,

} from '../../types/types'

// Register User 
export const loginAdmin = (res) => async dispatch => {
    try {
        // let res = await instance.post('api//admin/login', data)
        dispatch({
            type: LOGIN_ADMIN,
            payload: res.data
        })
    } catch (error) {

    }

}


export const logoutAdmin = () => async dispatch => {
    dispatch({
        type: LOGOUT_ADMIN,
    })


}

export const updateAdmin = (data ) => async dispatch => {
    dispatch({
        type: UPDATE_ADMIN,
        payload: data

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

export const getCourses = ({ data, type }) => async dispatch => {

    try {

        if (type === "live") {
            dispatch({
                type: GET_LIVE_COURSES,
                payload: data
            })
        }
        else {
            dispatch({
                type: GET_COURSES,
                payload: data
            })
        }
    }
    catch (err) {

    }
}


export const AdddelUpdateCatagories = ({ data, type }) => dispatch => {
    debugger
    try {
        if (type === "del") {
            dispatch({
                type: DEL_CATEGORY,
                payload: data.id
            })
        }
        else if (type === "add") {
            dispatch({
                type: ADD_CATAGORY,
                payload: data
            })
        }
        else {
            dispatch({
                type: UPDATE_CATEGORY,
                payload: data
            })
        }


    }
    catch (err) { }


}




export const getCatagories = (data) => dispatch => {
    try {
        dispatch({
            type: GET_COURSE_CATAGORIES,
            payload: data
        })

    }
    catch (err) { }


}






export const getStatistic = (data) => dispatch => {
    try {
        dispatch({
            type: GET_ADMIN_DASHBOARD_STAT,
            payload: data
        })

    }
    catch (err) { }


}


export const getTransaction = (data) => dispatch => {
    try {
        dispatch({
            type: GET_ADMIN_TRANSACTION_STATICS,
            payload: data
        })

    }
    catch (err) { }


}

export const AdddelUpdateMembership = ({ data, type }) => dispatch => {
    debugger
    try {
        if (type === "del") {
            dispatch({
                type: DEL_MEMBERSHIP,
                payload: data
            })
        }
        else if (type === "add") {
            dispatch({
                type: ADD_MEMBERSHIP,
                payload: data
            })
        }
        else if (type === "get") {
            dispatch({
                type: GET_MEMBERSHIP,
                payload: data
            })
        }
        else {
            dispatch({
                type: UPDATE_MEMBERSHIP,
                payload: data
            })
        }


    }
    catch (err) { }


}





