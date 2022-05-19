
import {
    PAYEMENT_CARD,
    RESET_CART,
    REG_CART,
    DELETE_CART,
    REG_BOOK_MARK,
    GET_BOOK_MARK,
} from '../../types/types'
import instance from '../../../confiq/axios/instance'








// Register User 
export const SaveCart = (course) => dispatch => {
    dispatch({
        type: REG_CART,
        payload: course
    })

}

export const SaveBookmark = (course) => dispatch => {
    dispatch({
        type: REG_BOOK_MARK,
        payload: course
    })

}




// Register User 
export const DeleteCart = (id) => async dispatch => {
    try {
        dispatch({
            type: DELETE_CART,
            payload: id
        })
    }
    catch (err) {

    }
}


// Register User 
export const SaveCard = (id) => async dispatch => {
    try {
        dispatch({
            type: PAYEMENT_CARD,
            payload: id
        })
    }
    catch (err) {

    }
}


export const ResetCart = () => async dispatch => {
    try {
        dispatch({
            type: RESET_CART,
            payload: ''

        })
    }
    catch (err) {

    }
}

