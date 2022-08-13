
import {
    ADD_CRICULUM,
    NETWORK_FAIL,
    ADD_MORE_CRICULUM,
    ADD_MORE_LECTURE,
    ADD_CRICULUM_LECTURE,
    ADD_CRICULUM_THUMNAILS,
    DEL_CRICULUM,
    DEL_CRICULUM_THUMNAIL,
    DEL_CRICULUM_LECTURE,

} from '../../types/types'

export const addCriculumInput = ({ name, value, index }) => dispatch => {
    
    dispatch({
        type: ADD_CRICULUM,
        payload: { name, value, index }
    })

}

export const delCriculumSection = (index) => dispatch => {
    
    dispatch({
        type: DEL_CRICULUM,
        payload:  index
    })

}

export const addLectureInput = ({ name, value, index, i }) => dispatch => {
    dispatch({
        type: ADD_CRICULUM_LECTURE,
        payload: { name, value, index, i }
    })

}

export const addLectureThumanil = ({ data, index, i }) => dispatch => {
    
    dispatch({
        type: ADD_CRICULUM_THUMNAILS,
        payload: { data, index, i }
    })

}



export const delLectureThumanil = ({ index, i }) => dispatch => {
    dispatch({
        type: DEL_CRICULUM_THUMNAIL,
        payload: {index, i }
    })

}


export const networkFail = () => dispatch => {
    dispatch({
        type: NETWORK_FAIL,
    })

}


export const delLecture = ({  index, i }) => dispatch => {
    
    dispatch({
        type: DEL_CRICULUM_LECTURE,
        payload: { index, i }
    })

}

export const addMoreCriculum = () => dispatch => {
    let data = {
        title: "",
        lectures: [
            {
                title: "",
                file_type: "",
                object_key: "",
                thumbnail: "",
                progressbar: "",
            },
        ],
    }


    dispatch({
        type: ADD_MORE_CRICULUM,
        payload: data
    })

}


export const addMoreLect = (index) => dispatch => {
    let data = {
                title: "",
                file_type: "",
                object_key: "",
                thumbnail: "",
                progressbar: "",
    }


    dispatch({
        type: ADD_MORE_LECTURE,
        payload: {data , index}
    })

}