
import {
    ADD_LECTURE_PREVIEW,
    ADD_MORE_LECTURE_PREVIEW,
    ADD_CRICULUM_THUMNAIL_PREVIEW,
    DEL_CRICULUM_THUMNAIL_PREVIEW,
    ADD_CRICULUM_LECTURE_PREVIEW,
    DEL_CRICULUM_LECTURE_PREVIEW,
    DELE_CRICULUM_LECTURE_PREVIEW,
    NETWORK_FAIL_PREVIEW,
    CLEAR_STATE,

} from '../../types/types'



export const addMoreLectPreview = () => dispatch => {
    
    let data = {
        title: "",
        file_type: "",
        object_key: "",
        thumbnail: "",
        progressbar: "",
    }


    dispatch({
        type: ADD_MORE_LECTURE_PREVIEW,
        payload:  data 
    })

}

export const addLecturePreview = (data) => dispatch => {

    let lectId = {
        course_section_lecture_id : data.id,
    }
    
    dispatch({
        type: ADD_CRICULUM_LECTURE_PREVIEW,
        payload: lectId 
    })

}

export const delLecturePreviews = (data) => dispatch => {

    let lectId = {
        course_section_lecture_id : data.course_section_id
    }
    
    dispatch({
        type: DELE_CRICULUM_LECTURE_PREVIEW,
        payload: lectId 
    })

}





export const addLectureInputPreview = ({ name, value, index,  }) => dispatch => {
    
    dispatch({
        type: ADD_LECTURE_PREVIEW ,
        payload: { name, value, index }
    })

}

export const addLectureThumanilPreview = ({ data, index }) => dispatch => {
    
    dispatch({
        type: ADD_CRICULUM_THUMNAIL_PREVIEW,
        payload: { data, index }
    })

}



export const delLectureThumanilPreview = (index) => dispatch => {
    
    dispatch({
        type: DEL_CRICULUM_THUMNAIL_PREVIEW,
        payload: index
    })

}


export const networkFail = () => dispatch => {
    
    dispatch({
        type: NETWORK_FAIL_PREVIEW,
    })

}


export const delLecturepreview = (index) => dispatch => {
    
    dispatch({
        type: DEL_CRICULUM_LECTURE_PREVIEW,
        payload: index
    })

}


export const clearStates = () => dispatch => {
    
    dispatch({
        type: CLEAR_STATE,
        
    })

}



