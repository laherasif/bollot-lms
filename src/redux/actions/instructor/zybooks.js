
import {
    ADD_ZYBOOKS_INPUTS,
    DELET_ZYBOOKS_COURSE,
    ADD_INSTRUCTOR_CONTENT,
    DEL_INSTRUCTOR,
    ZYBOOKS_STEP,
    CLEAR_ZYBOOKS_STATE

} from '../../types/types'


export const addZybookCourseInput = ({ name, value }) => dispatch => {

    dispatch({
        type: ADD_ZYBOOKS_INPUTS,
        payload: { name, value }
    })


}


export const deleteZybookCourse = (id, name) => dispatch => {

    dispatch({
        type: DELET_ZYBOOKS_COURSE,
        payload: { id, name }
    })

}

export const addMoreInstructor = (name) => dispatch => {

    dispatch({
        type: ADD_ZYBOOKS_INPUTS,
        payload: { name }
    })

}



export const addInstructorContent = ({ name, index, value }) => dispatch => {
    dispatch({
        type: ADD_INSTRUCTOR_CONTENT,
        payload: { name, index, value }
    })

}

export const delInstructor = (index) => dispatch => {

    dispatch({
        type: DEL_INSTRUCTOR,
        payload: index
    })

}

export const saveStep = (step) => dispatch => {

    dispatch({
        type: ZYBOOKS_STEP,
        payload: step
    })

}


export const ClearStates = () => dispatch => {
    dispatch({
        type: CLEAR_ZYBOOKS_STATE,

    })
}


