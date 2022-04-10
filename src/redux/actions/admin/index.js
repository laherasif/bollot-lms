
import {
    LOGIN_ADMIN,
    GET_ALL_INSTRUCTOR,
    GET_ALL_STUDENT,
    DELETE_STU,
    UPDATE_STU,
    DELETE_INS,
    UPDATE_INS,
} from '../../types/types'
import axios from 'axios'








// Register User 
export const loginAdmin = (data) => async  dispatch => {
    try {
        let res = await axios.post('api//admin/login', data)
        dispatch({
            type: LOGIN_ADMIN,
            payload: res.data
        })
    } catch (error) {
        console.log("admin error", error)

    }

}



// Register User 
export const getAllStudent = () => async dispatch => {
   
    try {
        let res = await axios.get('api//admin/students')
        dispatch({
            type: GET_ALL_STUDENT,
            payload: res.data.response.students
        })
    }
    catch (err) {

    }
}

export const getAllInstructor = () => async dispatch => {
    try {
        let res = await axios.get('api//admin/instructors')

        dispatch({
            type: GET_ALL_INSTRUCTOR,
            payload: res.data.response.instructors
        })
    }
    catch (err) {

    }
}

export const delStuIns = (id) => async dispatch => {
    try {
        await axios.post('api//admin/user/delete', id)
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

export const updateStuIns = (id) => async dispatch => {
    try {
         await axios.post('api//admin/user/update', id)
        if (role === "student") {
            dispatch({
                type: UPDATE_STU,
                payload: id
            })
        }
        else {
            dispatch({
                type: UPDATE_INS,
                payload: id
            })
        }
    }
    catch (err) {

    }
}

