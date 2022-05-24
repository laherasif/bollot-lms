
import {
    EDIT_ADD_COURSE,
    EDIT_CRICCULUM,
    EDIT_QUIZ,
    EDIT_PREVIEW,
    EDIT_LIVE_CLASSES
} from '../../types/types'

export const SaveCourse = (course) => dispatch => {
    dispatch({
        type: REG_COURSE,
        payload: course
    })

}

export const GetCouses = (type) => dispatch => {
    try {
        dispatch({
            type: GET_COURSES_LIVE,
            payload: course
        })

    }
    catch (err) { }


}

export const EditCourse = (data) => async dispatch => {
    debugger
    try {
        dispatch({
            type: EDIT_ADD_COURSE,
            payload: data
        })


        dispatch({
            type: EDIT_CRICCULUM,
            payload: data.sections
        })

        dispatch({
            type: EDIT_QUIZ,
            payload: data.quiz
        })

        dispatch({
            type: EDIT_PREVIEW,
            payload: data.previews
        })

        dispatch({
            type: EDIT_LIVE_CLASSES,
            payload: data.schedule
        })


    }
    catch (err) {

    }
}


// export const SaveCart = (course) =>  dispatch => {
//     dispatch({
//         type: REG_CART,
//         payload: course
//     })

// }

// export const SaveCart = (course) =>  dispatch => {
//     dispatch({
//         type: REG_CART,
//         payload: course
//     })

// }
