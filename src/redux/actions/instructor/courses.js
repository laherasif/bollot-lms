

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
