
import {
    // ADD_IMAGE_URL,
    ADD_COURSE_INPUTS,
    ADD_COURSE_CONTENT_MORE,
    ADD_COURSE_CONTENT,
    DEL_COURSE_CONTENT,
    COURSE_ID,
    PAGE_NO,

} from '../../types/types'



export const coursesId = (id) => dispatch => {
    
    dispatch({
        type: COURSE_ID,
        payload: id
    })

}

export const pageNo = (no) => dispatch => {
    
    dispatch({
        type: PAGE_NO,
        payload: id
    })

}



export const addCourseInput = ({ name, value }) => dispatch => {
    dispatch({
        type: ADD_COURSE_INPUTS,
        payload: { name, value }
    })

}

export const addCourseContentMore = (field) => dispatch => {
    
    dispatch({
        type: ADD_COURSE_CONTENT_MORE,
        payload: field
    })

}



export const addCourseContentInput = ({ field, index, value }) => dispatch => {
    dispatch({
        type: ADD_COURSE_CONTENT,
        payload: { field, index, value }
    })

}

export const delCourseContent = ({ field, index }) => dispatch => {
    
    dispatch({
        type: DEL_COURSE_CONTENT,
        payload: { field, index }
    })

}

