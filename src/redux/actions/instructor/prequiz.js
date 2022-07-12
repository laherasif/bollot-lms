
import {
    ADD_PRE_QUIZ_QUESTION_INPUT,
    ADD_PRE_QUIZ_OPTION_INPUT,
    QUIZ_PRE_OPTION_RADIO,
    ADD_PRE_MORE_QUIZ,
    ADD_PRE_MORE_OPTION,
    DEL_PRE_QUESTION,
    DEL_PRE_OPTIONS,


} from '../../types/types'

export const addPreQuestionInput = ({ name, value, index }) => dispatch => {

    dispatch({
        type: ADD_PRE_QUIZ_QUESTION_INPUT,
        payload: { name, value, index }
    })

}


export const addPreOptionInput = ({ name, value, index, i }) => dispatch => {

    dispatch({
        type: ADD_PRE_QUIZ_OPTION_INPUT,
        payload: { name, value, index, i }
    })

}

export const addPreOptionRadio = ({ name, index, i }) => dispatch => {

    dispatch({
        type: QUIZ_PRE_OPTION_RADIO,
        payload: { name, index, i }
    })

}



export const addPreMoreQuiz = () => dispatch => {

    let data = {
        question: '',
        options: [
            { option: "", correct: false, },
            { option: "", correct: false, },
            { option: "", correct: false, },
            { option: "", correct: false, },

        ]
    }
    dispatch({
        type: ADD_PRE_MORE_QUIZ,
        payload: data
    })

}



export const addPreMoreOption = (index) => dispatch => {

    let data = { option: "", correct: false, }

    dispatch({
        type: ADD_PRE_MORE_OPTION,
        payload: { data, index }
    })

}


export const delPreQuiz = (index) => dispatch => {

    dispatch({
        type: DEL_PRE_QUESTION,
        payload: index
    })

}

export const delPreQuizOption = ({ index, i }) => dispatch => {

    dispatch({
        type: DEL_PRE_OPTIONS,
        payload: { index, i }
    })

}

